function eraFk425(r1950, d1950, dr1950, dd1950, p1950, v1950)
/*
**  - - - - - - - - -
**   e r a F k 4 2 5
**  - - - - - - - - -
**
**  Convert B1950.0 FK4 star catalog data to J2000.0 FK5.
**
**  This function converts a star's catalog data from the old FK4
** (Bessel-Newcomb) system to the later IAU 1976 FK5 (Fricke) system.
**
**  Given: (all B1950.0, FK4)
**     r1950,d1950    double   B1950.0 RA,Dec (rad)
**     dr1950,dd1950  double   B1950.0 proper motions (rad/trop.yr)
**     p1950          double   parallax (arcsec)
**     v1950          double   radial velocity (km/s, +ve = moving away)
**
**  Returned: (all J2000.0, FK5)
**     r2000,d2000    double   J2000.0 RA,Dec (rad)
**     dr2000,dd2000  double   J2000.0 proper motions (rad/Jul.yr)
**     p2000          double   parallax (arcsec)
**     v2000          double   radial velocity (km/s, +ve = moving away)
**
**  Notes:
**
**  1) The proper motions in RA are dRA/dt rather than cos(Dec)*dRA/dt,
**     and are per year rather than per century.
**
**  2) The conversion is somewhat complicated, for several reasons:
**
**     . Change of standard epoch from B1950.0 to J2000.0.
**
**     . An intermediate transition date of 1984 January 1.0 TT.
**
**     . A change of precession model.
**
**     . Change of time unit for proper motion (tropical to Julian).
**
**     . FK4 positions include the E-terms of aberration, to simplify
**       the hand computation of annual aberration.  FK5 positions
**       assume a rigorous aberration computation based on the Earth's
**       barycentric velocity.
**
**     . The E-terms also affect proper motions, and in particular cause
**       objects at large distances to exhibit fictitious proper
**       motions.
**
**     The algorithm is based on Smith et al. (1989) and Yallop et al.
**     (1989), which presented a matrix method due to Standish (1982) as
**     developed by Aoki et al. (1983), using Kinoshita's development of
**     Andoyer's post-Newcomb precession.  The numerical constants from
**     Seidelmann (1992) are used canonically.
**
**  3) Conversion from B1950.0 FK4 to J2000.0 FK5 only is provided for.
**     Conversions for different epochs and equinoxes would require
**     additional treatment for precession, proper motion and E-terms.
**
**  4) In the FK4 catalog the proper motions of stars within 10 degrees
**     of the poles do not embody differential E-terms effects and
**     should, strictly speaking, be handled in a different manner from
**     stars outside these regions.  However, given the general lack of
**     homogeneity of the star data available for routine astrometry,
**     the difficulties of handling positions that may have been
**     determined from astrometric fields spanning the polar and non-
**     polar regions, the likelihood that the differential E-terms
**     effect was not taken into account when allowing for proper motion
**     in past astrometry, and the undesirability of a discontinuity in
**     the algorithm, the decision has been made in this ERFA algorithm
**     to include the effects of differential E-terms on the proper
**     motions for all stars, whether polar or not.  At epoch J2000.0,
**     and measuring "on the sky" rather than in terms of RA change, the
**     errors resulting from this simplification are less than
**     1 milliarcsecond in position and 1 milliarcsecond per century in
**     proper motion.
**
**  Called:
**     eraAnp       normalize angle into range 0 to 2pi
**     eraPv2s      pv-vector to spherical coordinates
**     eraPdp       scalar product of two p-vectors
**     eraPvmpv     pv-vector minus pv_vector
**     eraPvppv     pv-vector plus pv_vector
**     eraS2pv      spherical coordinates to pv-vector
**     eraSxp       multiply p-vector by scalar
**
**  References:
**
**     Aoki, S. et al., 1983, "Conversion matrix of epoch B1950.0
**     FK4-based positions of stars to epoch J2000.0 positions in
**     accordance with the new IAU resolutions".  Astron.Astrophys.
**     128, 263-267.
**
**     Seidelmann, P.K. (ed), 1992, "Explanatory Supplement to the
**     Astronomical Almanac", ISBN 0-935702-68-7.
**
**     Smith, C.A. et al., 1989, "The transformation of astrometric
**     catalog systems to the equinox J2000.0".  Astron.J. 97, 265.
**
**     Standish, E.M., 1982, "Conversion of positions and proper motions
**     from B1950.0 to the IAU system at J2000.0".  Astron.Astrophys.,
**     115, 1, 20-22.
**
**     Yallop, B.D. et al., 1989, "Transformation of mean star places
**     from FK4 B1950.0 to FK5 J2000.0 using matrices in 6-space".
**     Astron.J. 97, 274.
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var r2000 = 0.0;;
   var d2000 = 0.0;;
   var dr2000 = 0.0;;
   var dd2000 = 0.0;;
   var p2000 = 0.0;;
   var v2000 = 0.0;;
   var _rv6;

/* Radians per year to arcsec per century */
   var PMF = 100.0*ERFA_DR2AS;

/* Small number to avoid arithmetic problems */
   var TINY = 1e-30;

/* Miscellaneous */
   var r, d, ur, ud, px, rv, pxvf, w, rd;
   var i, j, k, l;

/* Pv-vectors */
   var r0 = [[], []], pv1 = [[], []], pv2 = [[], []];

/*
** CANONICAL CONSTANTS (Seidelmann 1992)
*/

/* Km per sec to AU per tropical century */
/* = 86400 * 36524.2198782 / 149597870.7 */
   var VF = 21.095;

/* Constant pv-vector (cf. Seidelmann 3.591-2, vectors A and Adot) */
   var                 a = [
                      [ -1.62557e-6, -0.31919e-6, -0.13843e-6 ],
                      [ +1.245e-3,   -1.580e-3,   -0.659e-3   ]
                           ];

/* 3x2 matrix of pv-vectors (cf. Seidelmann 3.591-4, matrix M) */
   var                 em = [

    [ [ [ +0.9999256782,     -0.0111820611,     -0.0048579477     ],
        [ +0.00000242395018, -0.00000002710663, -0.00000001177656 ] ],

      [ [ +0.0111820610,     +0.9999374784,     -0.0000271765     ],
        [ +0.00000002710663, +0.00000242397878, -0.00000000006587 ] ],

      [ [ +0.0048579479,     -0.0000271474,     +0.9999881997,    ],
        [ +0.00000001177656, -0.00000000006582, +0.00000242410173 ] ] ],

    [ [ [ -0.000551,         -0.238565,         +0.435739        ],
        [ +0.99994704,       -0.01118251,       -0.00485767       ] ],

      [ [ +0.238514,         -0.002667,         -0.008541        ],
        [ +0.01118251,       +0.99995883,       -0.00002718       ] ],

      [ [ -0.435623,         +0.012254,         +0.002117         ],
        [ +0.00485767,       -0.00002714,       +1.00000956       ] ] ]

                                  ];

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* The FK4 data (units radians and arcsec per tropical century). */
   r = r1950;
   d = d1950;
   ur = dr1950*PMF;
   ud = dd1950*PMF;
   px = p1950;
   rv = v1950;

/* Express as a pv-vector. */
   pxvf = px*VF;
   w = rv*pxvf;
   r0 = eraS2pv(r, d, 1.0, ur, ud, w);

/* Allow for E-terms (cf. Seidelmann 3.591-2). */
   pv1 = eraPvmpv(r0, a);
   pv2[0] = eraSxp(eraPdp(r0[0], a[0]), r0[0]);
   pv2[1] = eraSxp(eraPdp(r0[0], a[1]), r0[0]);
   pv1 = eraPvppv(pv1, pv2);

/* Convert pv-vector to Fricke system (cf. Seidelmann 3.591-3). */
   for ( i = 0; i < 2; i++ ) {
      for ( j = 0; j < 3; j++ ) {
         w = 0.0;
         for ( k = 0; k < 2; k++ ) {
            for ( l = 0; l < 3; l++ ) {
               w += em[i][j][k][l] * pv1[k][l];
            }
         }
         pv2[i][j] = w;
      }
   }

/* Revert to catalog form. */
   (_rv6 = eraPv2s(pv2))[0];
   r = _rv6[0];
   d = _rv6[1];
   w = _rv6[2];
   ur = _rv6[3];
   ud = _rv6[4];
   rd = _rv6[5];
   if ( px > TINY ) {
      rv = rd/pxvf;
      px = px/w;
   }

/* Return the results. */
   r2000 = eraAnp(r);
   d2000 = d;
   dr2000 = ur/PMF;
   dd2000 = ud/PMF;
   v2000 = rv;
   p2000 = px;

/* Finished. */

return [r2000, d2000, dr2000, dd2000, p2000, v2000];
}