function eraPmpx(rc, dc, pr, pd, px, rv, pmt, pob)
/*
**  - - - - - - - -
**   e r a P m p x
**  - - - - - - - -
**
**  Proper motion and parallax.
**
**  Given:
**     rc,dc  double     ICRS RA,Dec at catalog epoch (radians)
**     pr     double     RA proper motion (radians/year; Note 1)
**     pd     double     Dec proper motion (radians/year)
**     px     double     parallax (arcsec)
**     rv     double     radial velocity (km/s, +ve if receding)
**     pmt    double     proper motion time interval (SSB, Julian years)
**     pob    double[3]  SSB to observer vector (au)
**
**  Returned:
**     pco    double[3]  coordinate direction (BCRS unit vector)
**
**  Notes:
**
**  1) The proper motion in RA is dRA/dt rather than cos(Dec)*dRA/dt.
**
**  2) The proper motion time interval is for when the starlight
**     reaches the solar system barycenter.
**
**  3) To avoid the need for iteration, the Roemer effect (i.e. the
**     small annual modulation of the proper motion coming from the
**     changing light time) is applied approximately, using the
**     direction of the star at the catalog epoch.
**
**  References:
**
**     1984 Astronomical Almanac, pp B39-B41.
**
**     Urban, S. & Seidelmann, P. K. (eds), Explanatory Supplement to
**     the Astronomical Almanac, 3rd ed., University Science Books
**     (2013), Section 7.2.
**
**  Called:
**     eraPdp       scalar product of two p-vectors
**     eraPn        decompose p-vector into modulus and direction
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var pco = [0, 0, 0];;
   var _rv2;

/* Km/s to au/year */
   var VF = ERFA_DAYSEC*ERFA_DJM/ERFA_DAU;

/* Light time for 1 au, Julian years */
   var AULTY = ERFA_AULT/ERFA_DAYSEC/ERFA_DJY;

   var i;
   var sr, cr, sd, cd, x, y, z, p = [], dt, pxr, w, pdz, pm = [];


/* Spherical coordinates to unit vector (and useful functions). */
   sr = Math.sin(rc);
   cr = Math.cos(rc);
   sd = Math.sin(dc);
   cd = Math.cos(dc);
   p[0] = x = cr*cd;
   p[1] = y = sr*cd;
   p[2] = z = sd;

/* Proper motion time interval (y) including Roemer effect. */
   dt = pmt + eraPdp(p, pob)*AULTY;

/* Space motion (radians per year). */
   pxr = px * ERFA_DAS2R;
   w = VF * rv * pxr;
   pdz = pd * z;
   pm[0] = - pr*y - pdz*cr + w*x;
   pm[1] =   pr*x - pdz*sr + w*y;
   pm[2] =   pd*cd + w*z;

/* Coordinate direction of star (unit vector, BCRS). */
   for (i = 0; i < 3; i++) {
      p[i] += dt*pm[i] - pxr*pob[i];
   }
   (_rv2 = eraPn(p))[0];
   w = _rv2[0];
   pco = _rv2[1];

/* Finished. */

return pco;
}