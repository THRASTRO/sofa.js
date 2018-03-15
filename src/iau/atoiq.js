function iauAtoiq(type, ob1, ob2, astrom)
/*
**  - - - - - - - - -
**   i a u A t o i q
**  - - - - - - - - -
**
**  Quick observed place to CIRS, given the star-independent astrometry
**  parameters.
**
**  Use of this function is appropriate when efficiency is important and
**  where many star positions are all to be transformed for one date.
**  The star-independent astrometry parameters can be obtained by
**  calling iauApio[13] or iauApco[13].
**
**  Status:  support function.
**
**  Given:
**     type   char[]     type of coordinates: "R", "H" or "A" (Note 1)
**     ob1    double     observed Az, HA or RA (radians; Az is N=0,E=90)
**     ob2    double     observed ZD or Dec (radians)
**     astrom iauASTROM* star-independent astrometry parameters:
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
**     there are no gross local effects, the predicted observed
**     coordinates should be within 0.05 arcsec (optical) or 1 arcsec
**     (radio) for a zenith distance of less than 70 degrees, better
**     than 30 arcsec (optical or radio) at 85 degrees and better than
**     20 arcmin (optical) or 30 arcmin (radio) at the horizon.
**
**     Without refraction, the complementary functions iauAtioq and
**     iauAtoiq are self-consistent to better than 1 microarcsecond all
**     over the celestial sphere.  With refraction included, consistency
**     falls off at high zenith distances, but is still better than
**     0.05 arcsec at 85 degrees.
**
**  4) It is advisable to take great care with units, as even unlikely
**     values of the input parameters are accepted and processed in
**     accordance with the models used.
**
**  Called:
**     iauS2c       spherical coordinates to unit vector
**     iauC2s       p-vector to spherical
**     iauAnp       normalize angle into range 0 to 2pi
**
**  This revision:   2013 October 9
**
**  SOFA release 2018-01-30
**
**  Copyright (C) 2018 IAU SOFA Board.  See notes at end.
*/
{
   var ri = 0.0;;
   var di = 0.0;;
   var _rv2;

   var c;
   var c1, c2, sphi, cphi, ce, xaeo, yaeo, zaeo, v = [], xmhdo, ymhdo, zmhdo, az, sz, zdo, refa, refb, tz, dref, zdt, xaet, yaet, zaet, xmhda, ymhda, zmhda, f, xhd, yhd, zhd, xpl, ypl, w, hma;


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
      v = iauS2c(-c1, c2);
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
   tz = sz / zaeo;
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
   xpl = astrom.xpl;
   ypl = astrom.ypl;
   w = xpl*xhd - ypl*yhd + zhd;
   v[0] = xhd - xpl*w;
   v[1] = yhd + ypl*w;
   v[2] = w - ( xpl*xpl + ypl*ypl ) * zhd;

/* To spherical -HA,Dec. */
   (_rv2 = iauC2s(v))[0];
   hma = _rv2[0];
   di = _rv2[1];

/* Right ascension. */
   ri = iauAnp(astrom.eral + hma);

/* Finished. */

/*
 *+----------------------------------------------------------------------
 *
 *  IAU SOFA functions converted to JS
 *  http:://www.github.com/mgreter/sofa.js
 *  2016 by Marcel Greter
 *
 *  The conversion is done by a custom hacked perl script.
 *  Automatically generates QUnit tests for all functions.
 *
 *  Please read notice below, as all rights go to the Standards
 *  Of Fundamental Astronomy (SOFA) Review Board of the International
 *  Astronomical Union, as far as applicable. There is no guarantee
 *  that the conversion is bug free and I give no warranty of
 *  usability or correctness whatsoever.
 *
 *  The agreement below (3c/d) says that functions should
 *  be renamed. From the preface I guess this only applies
 *  if the function behavior was changed in any way. Since
 *  this is a one-to-one conversion, it shouldn't apply?
 *
 *+----------------------------------------------------------------------
 * SOFA-Issue: 2016-05-03
 *+----------------------------------------------------------------------
 *
 *  Copyright (C) 2016
 *  Standards Of Fundamental Astronomy Review Board
 *  of the International Astronomical Union.
 *
 *  =====================
 *  SOFA Software License
 *  =====================
 *
 *  NOTICE TO USER:
 *
 *  BY USING THIS SOFTWARE YOU ACCEPT THE FOLLOWING TERMS AND CONDITIONS
 *  WHICH APPLY TO ITS USE.
 *
 *  1. The Software is owned by the IAU SOFA Review Board ("the Board").
 *
 *  2. Permission is granted to anyone to use the SOFA software for any
 *     purpose, including commercial applications, free of charge and
 *     without payment of royalties, subject to the conditions and
 *     restrictions listed below.
 *
 *  3. You (the user) may copy and adapt the SOFA software and its
 *     algorithms for your own purposes and you may copy and distribute
 *     a resulting "derived work" to others on a world-wide, royalty-free
 *     basis, provided that the derived work complies with the following
 *     requirements:
 *
 *     a) Your work shall be marked or carry a statement that it (i) uses
 *        routines and computations derived by you from software provided
 *        by SOFA under license to you; and (ii) does not contain
 *        software provided by SOFA or software that has been distributed
 *        by or endorsed by SOFA.
 *
 *     b) The source code of your derived work must contain descriptions
 *        of how the derived work is based upon and/or differs from the
 *        original SOFA software.
 *
 *     c) The name(s) of all routine(s) that you distribute shall differ
 *        from the SOFA names, even when the SOFA content has not been
 *        otherwise changed.
 *
 *     d) The routine-naming prefix "iau" shall not be used.
 *
 *     e) The origin of the SOFA components of your derived work must not
 *        be misrepresented;  you must not claim that you wrote the
 *        original software, nor file a patent application for SOFA
 *        software or algorithms embedded in the SOFA software.
 *
 *     f) These requirements must be reproduced intact in any source
 *        distribution and shall apply to anyone to whom you have granted
 *        a further right to modify the source code of your derived work.
 *
 *  4. In any published work or commercial products which includes
 *     results achieved by using the SOFA software, you shall acknowledge
 *     that the SOFA software was used in obtaining those results.
 *
 *  5. You shall not cause the SOFA software to be brought into
 *     disrepute, either by misuse, or use for inappropriate tasks, or by
 *     inappropriate modification.
 *
 *  6. The SOFA software is provided "as is" and the Board makes no
 *     warranty as to its use or performance.   The Board does not and
 *     cannot warrant the performance or results which the user may obtain
 *     by using the SOFA software.  The Board makes no warranties, express
 *     or implied, as to non-infringement of third party rights,
 *     merchantability, or fitness for any particular purpose.  In no
 *     event will the Board be liable to the user for any consequential,
 *     incidental, or special damages, including any lost profits or lost
 *     savings, even if a Board representative has been advised of such
 *     damages, or for any claim by any third party.
 *
 *  7. The provision of any version of the SOFA software under the terms
 *     and conditions specified herein does not imply that future
 *     versions will also be made available under the same terms and
 *     conditions.

 *  Correspondence concerning SOFA software should be addressed as
 *  follows:
 *
 *     Internet email: sofa@rl.ac.uk
 *     Postal address: IAU SOFA Center
 *                     Rutherford Appleton Laboratory
 *                     Chilton, Didcot, Oxon OX11 0QX
 *                     United Kingdom
 *
 *-----------------------------------------------------------------------
*/

return [ri, di];
}