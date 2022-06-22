function eraG2icrs( dl, db)
/*
**  - - - - - - - - - -
**   e r a G 2 i c r s
**  - - - - - - - - - -
**
**  Transformation from Galactic Coordinates to ICRS.
**
**  Given:
**     dl     double      galactic longitude (radians)
**     db     double      galactic latitude (radians)
**
**  Returned:
**     dr     double      ICRS right ascension (radians)
**     dd     double      ICRS declination (radians)
**
**  Notes:
**
**  1) The IAU 1958 system of Galactic coordinates was defined with
**     respect to the now obsolete reference system FK4 B1950.0.  When
**     interpreting the system in a modern context, several factors have
**     to be taken into account:
**
**     . The inclusion in FK4 positions of the E-terms of aberration.
**
**     . The distortion of the FK4 proper motion system by differential
**       Galactic rotation.
**
**     . The use of the B1950.0 equinox rather than the now-standard
**       J2000.0.
**
**     . The frame bias between ICRS and the J2000.0 mean place system.
**
**     The Hipparcos Catalogue (Perryman & ESA 1997) provides a rotation
**     matrix that transforms directly between ICRS and Galactic
**     coordinates with the above factors taken into account.  The
**     matrix is derived from three angles, namely the ICRS coordinates
**     of the Galactic pole and the longitude of the ascending node of
**     the galactic equator on the ICRS equator.  They are given in
**     degrees to five decimal places and for canonical purposes are
**     regarded as exact.  In the Hipparcos Catalogue the matrix
**     elements are given to 10 decimal places (about 20 microarcsec).
**     In the present ERFA function the matrix elements have been
**     recomputed from the canonical three angles and are given to 30
**     decimal places.
**
**  2) The inverse transformation is performed by the function eraIcrs2g.
**
**  Called:
**     eraAnp       normalize angle into range 0 to 2pi
**     eraAnpm      normalize angle into range +/- pi
**     eraS2c       spherical coordinates to unit vector
**     eraTrxp      product of transpose of r-matrix and p-vector
**     eraC2s       p-vector to spherical
**
**  Reference:
**     Perryman M.A.C. & ESA, 1997, ESA SP-1200, The Hipparcos and Tycho
**     catalogues.  Astrometric and photometric star catalogues
**     derived from the ESA Hipparcos Space Astrometry Mission.  ESA
**     Publications Division, Noordwijk, Netherlands.
**
**  This revision:   2021 January 25
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var dr = 0.0;;
   var dd = 0.0;;
   var _rv3;

   var v1 = [], v2 = [];

/*
**  L2,B2 system of galactic coordinates in the form presented in the
**  Hipparcos Catalogue.  In degrees:
**
**  P = 192.85948    right ascension of the Galactic north pole in ICRS
**  Q =  27.12825    declination of the Galactic north pole in ICRS
**  R =  32.93192    Galactic longitude of the ascending node of
**                   the Galactic equator on the ICRS equator
**
**  ICRS to galactic rotation matrix, obtained by computing
**  R_3(-R) R_1(pi/2-Q) R_3(pi/2+P) to the full precision shown:
*/
   var                 r = [ [ -0.054875560416215368492398900454,
                        -0.873437090234885048760383168409,
                        -0.483835015548713226831774175116 ],
                      [ +0.494109427875583673525222371358,
                        -0.444829629960011178146614061616,
                        +0.746982244497218890527388004556 ],
                      [ -0.867666149019004701181616534570,
                        -0.198076373431201528180486091412,
                        +0.455983776175066922272100478348 ] ];


/* Spherical to Cartesian. */
   v1 = eraS2c(dl, db);

/* Galactic to ICRS. */
   v2 = eraTrxp(r, v1);

/* Cartesian to spherical. */
   (_rv3 = eraC2s(v2))[0];
   dr = _rv3[0];
   dd = _rv3[1];

/* Express in conventional ranges. */
   dr = eraAnp(dr);
   dd = eraAnpm(dd);

/* Finished. */

return [dr, dd ];
}