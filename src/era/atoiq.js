function eraAtoiq(type, ob1, ob2, astrom)
/*
**  - - - - - - - - -
**   e r a A t o i q
**  - - - - - - - - -
**
**  Quick observed place to CIRS, given the star-independent astrometry
**  parameters.
**
**  Use of this function is appropriate when efficiency is important and
**  where many star positions are all to be transformed for one date.
**  The star-independent astrometry parameters can be obtained by
**  calling eraApio[13] or eraApco[13].
**
**  Given:
**     type   char[]     type of coordinates: "R", "H" or "A" (Note 1)
**     ob1    double     observed Az, HA or RA (radians; Az is N=0,E=90)
**     ob2    double     observed ZD or Dec (radians)
**     astrom eraASTROM* star-independent astrometry parameters:
**      pmt    double       PM time interval (SSB, Julian years)
**      eb     double[3]    SSB to observer (vector, au)
**      eh     double[3]    Sun to observer (unit vector)
**      em     double       distance from Sun to observer (au)
**      v      double[3]    barycentric observer velocity (vector, c)
**      bm1    double       sqrt(1-|v|^2): reciprocal of Lorenz factor
**      bpn    double[3][3] bias-precession-nutation matrix
**      along  double       longitude + s' (radians)
**      xpl    double       polar motion xp wrt local meridian (radians)
**      ypl    double       polar motion yp wrt local meridian (radians)
**      sphi   double       sine of geodetic latitude
**      cphi   double       cosine of geodetic latitude
**      diurab double       magnitude of diurnal aberration vector
**      eral   double       "local" Earth rotation angle (radians)
**      refa   double       refraction constant A (radians)
**      refb   double       refraction constant B (radians)
**
**  Returned:
**     ri     double*    CIRS right ascension (CIO-based, radians)
**     di     double*    CIRS declination (radians)
**
**  Notes:
**
**  1) "Observed" Az,El means the position that would be seen by a
**     perfect geodetically aligned theodolite.  This is related to
**     the observed HA,Dec via the standard rotation, using the geodetic
**     latitude (corrected for polar motion), while the observed HA and
**     RA are related simply through the Earth rotation angle and the
**     site longitude.  "Observed" RA,Dec or HA,Dec thus means the
**     position that would be seen by a perfect equatorial with its
**     polar axis aligned to the Earth's axis of rotation.  By removing
**     from the observed place the effects of atmospheric refraction and
**     diurnal aberration, the CIRS RA,Dec is obtained.
**
**  2) Only the first character of the type argument is significant.
**     "R" or "r" indicates that ob1 and ob2 are the observed right
**     ascension and declination;  "H" or "h" indicates that they are
**     hour angle (west +ve) and declination;  anything else ("A" or
**     "a" is recommended) indicates that ob1 and ob2 are azimuth (north
**     zero, east 90 deg) and zenith distance.  (Zenith distance is used
**     rather than altitude in order to reflect the fact that no
**     allowance is made for depression of the horizon.)
**
**  3) The accuracy of the result is limited by the corrections for
**     refraction, which use a simple A*tan(z) + B*tan^3(z) model.
**     Providing the meteorological parameters are known accurately and
**     there are no gross local effects, the predicted intermediate
**     coordinates should be within 0.05 arcsec (optical) or 1 arcsec
**     (radio) for a zenith distance of less than 70 degrees, better
**     than 30 arcsec (optical or radio) at 85 degrees and better than
**     20 arcmin (optical) or 25 arcmin (radio) at the horizon.
**
**     Without refraction, the complementary functions eraAtioq and
**     eraAtoiq are self-consistent to better than 1 microarcsecond all
**     over the celestial sphere.  With refraction included, consistency
**     falls off at high zenith distances, but is still better than
**     0.05 arcsec at 85 degrees.
**
**  4) It is advisable to take great care with units, as even unlikely
**     values of the input parameters are accepted and processed in
**     accordance with the models used.
**
**  Called:
**     eraS2c       spherical coordinates to unit vector
**     eraC2s       p-vector to spherical
**     eraAnp       normalize angle into range 0 to 2pi
**
**  This revision:   2020 December 7
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var ri = 0.0;;
   var di = 0.0;;
   var _rv2;

/* Minimum sin(alt) for refraction purposes */
   var SELMIN = 0.05;

   var c;
   var c1, c2, sphi, cphi, ce, xaeo, yaeo, zaeo, v = [], xmhdo, ymhdo, zmhdo, az, sz, zdo, refa, refb, tz, dref, zdt, xaet, yaet, zaet, xmhda, ymhda, zmhda, f, xhd, yhd, zhd, sx, cx, sy, cy, hma;


/* Coordinate type. */
   c = type[0];

/* Coordinates. */
   c1 = ob1;
   c2 = ob2;

/* Sin, cos of latitude. */
   sphi = astrom.sphi;
   cphi = astrom.cphi;

/* Standardize coordinate type. */
   if ( c == 'r' || c == 'R' ) {
      c = ('R');
   } else if ( c == 'h' || c == 'H' ) {
      c = ('H');
   } else {
      c = ('A');
   }

/* If Az,ZD, convert to Cartesian (S=0,E=90). */
   if ( c == 'A' ) {
      ce = Math.sin(c2);
      xaeo = - Math.cos(c1) * ce;
      yaeo = Math.sin(c1) * ce;
      zaeo = Math.cos(c2);

   } else {

   /* If RA,Dec, convert to HA,Dec. */
      if ( c == 'R' ) c1 = astrom.eral - c1;

   /* To Cartesian -HA,Dec. */
      v = eraS2c(-c1, c2);
      xmhdo = v[0];
      ymhdo = v[1];
      zmhdo = v[2];

   /* To Cartesian Az,El (S=0,E=90). */
      xaeo = sphi*xmhdo - cphi*zmhdo;
      yaeo = ymhdo;
      zaeo = cphi*xmhdo + sphi*zmhdo;
   }

/* Azimuth (S=0,E=90). */
   az = ( xaeo != 0.0 || yaeo != 0.0 ) ? Math.atan2(yaeo,xaeo) : 0.0;

/* Sine of observed ZD, and observed ZD. */
   sz = Math.sqrt( xaeo*xaeo + yaeo*yaeo );
   zdo = Math.atan2( sz, zaeo );

/*
** Refraction
** ----------
*/

/* Fast algorithm using two constant model. */
   refa = astrom.refa;
   refb = astrom.refb;
   tz = sz / ( zaeo > SELMIN ? zaeo : SELMIN );
   dref = ( refa + refb*tz*tz ) * tz;
   zdt = zdo + dref;

/* To Cartesian Az,ZD. */
   ce = Math.sin(zdt);
   xaet = Math.cos(az) * ce;
   yaet = Math.sin(az) * ce;
   zaet = Math.cos(zdt);

/* Cartesian Az,ZD to Cartesian -HA,Dec. */
   xmhda = sphi*xaet + cphi*zaet;
   ymhda = yaet;
   zmhda = - cphi*xaet + sphi*zaet;

/* Diurnal aberration. */
   f = ( 1.0 + astrom.diurab*ymhda );
   xhd = f * xmhda;
   yhd = f * ( ymhda - astrom.diurab );
   zhd = f * zmhda;

/* Polar motion. */
   sx = Math.sin(astrom.xpl);
   cx = Math.cos(astrom.xpl);
   sy = Math.sin(astrom.ypl);
   cy = Math.cos(astrom.ypl);
   v[0] = cx*xhd + sx*sy*yhd - sx*cy*zhd;
   v[1] = cy*yhd + sy*zhd;
   v[2] = sx*xhd - cx*sy*yhd + cx*cy*zhd;

/* To spherical -HA,Dec. */
   (_rv2 = eraC2s(v))[0];
   hma = _rv2[0];
   di = _rv2[1];

/* Right ascension. */
   ri = eraAnp(astrom.eral + hma);

/* Finished. */

return [ri, di];
}