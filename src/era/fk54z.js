function eraFk54z(r2000, d2000, bepoch)
/*
**  - - - - - - - - -
**   e r a F k 5 4 z
**  - - - - - - - - -
**
**  Convert a J2000.0 FK5 star position to B1950.0 FK4, assuming zero
**  proper motion in FK5 and parallax.
**
**  Given:
**     r2000,d2000    double   J2000.0 FK5 RA,Dec (rad)
**     bepoch         double   Besselian epoch (e.g. 1950.0)
**
**  Returned:
**     r1950,d1950    double   B1950.0 FK4 RA,Dec (rad) at epoch BEPOCH
**     dr1950,dd1950  double   B1950.0 FK4 proper motions (rad/trop.yr)
**
**  Notes:
**
**  1) In contrast to the eraFk524  routine, here the FK5 proper
**     motions, the parallax and the radial velocity are presumed zero.
**
**  2) This function converts a star position from the IAU 1976 FK5
**    (Fricke) system to the former FK4 (Bessel-Newcomb) system, for
**     cases such as distant radio sources where it is presumed there is
**     zero parallax and no proper motion.  Because of the E-terms of
**     aberration, such objects have (in general) non-zero proper motion
**     in FK4, and the present routine returns those fictitious proper
**     motions.
**
**  3) Conversion from B1950.0 FK4 to J2000.0 FK5 only is provided for.
**     Conversions involving other equinoxes would require additional
**     treatment for precession.
**
**  4) The position returned by this routine is in the B1950.0 FK4
**     reference system but at Besselian epoch BEPOCH.  For comparison
**     with catalogs the BEPOCH argument will frequently be 1950.0. (In
**     this context the distinction between Besselian and Julian epoch
**     is insignificant.)
**
**  5) The RA component of the returned (fictitious) proper motion is
**     dRA/dt rather than cos(Dec)*dRA/dt.
**
**  Called:
**     eraAnp       normalize angle into range 0 to 2pi
**     eraC2s       p-vector to spherical
**     eraFk524     FK4 to FK5
**     eraS2c       spherical to p-vector
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var r1950 = 0.0;;
   var d1950 = 0.0;;
   var dr1950 = 0.0;;
   var dd1950 = 0.0;;
   var _rv1, _rv3;

   var r, d, pr, pd, px, rv, p = [], w, v = [];
   var i;


/* FK5 equinox J2000.0 to FK4 equinox B1950.0. */
   (_rv1 = eraFk524(r2000, d2000, 0.0, 0.0, 0.0, 0.0))[0];
   r = _rv1[0];
   d = _rv1[1];
   pr = _rv1[2];
   pd = _rv1[3];
   px = _rv1[4];
   rv = _rv1[5];

/* Spherical to Cartesian. */
   p = eraS2c(r, d);

/* Fictitious proper motion (radians per year). */
   v[0] = - pr*p[1] - pd*Math.cos(r)*Math.sin(d);
   v[1] =   pr*p[0] - pd*Math.sin(r)*Math.sin(d);
   v[2] =             pd*Math.cos(d);

/* Apply the motion. */
   w = bepoch - 1950.0;
   for ( i = 0; i < 3; i++ ) {
      p[i] += w*v[i];
   }

/* Cartesian to spherical. */
   (_rv3 = eraC2s(p))[0];
   w = _rv3[0];
   d1950 = _rv3[1];
   r1950 = eraAnp(w);

/* Fictitious proper motion. */
   dr1950 = pr;
   dd1950 = pd;

/* Finished. */

return [r1950, d1950, dr1950, dd1950];
}