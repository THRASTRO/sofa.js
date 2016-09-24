function iauAtioq(ri, di, astrom)
/*
**  - - - - - - - - -
**   i a u A t i o q
**  - - - - - - - - -
**
**  Quick CIRS to observed place transformation.
**
**  Use of this function is appropriate when efficiency is important and
**  where many star positions are all to be transformed for one date.
**  The star-independent astrometry parameters can be obtained by
**  calling iauApio[13] or iauApco[13].
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     ri     double     CIRS right ascension
**     di     double     CIRS declination
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
**     aob    double*    observed azimuth (radians: N=0,E=90)
**     zob    double*    observed zenith distance (radians)
**     hob    double*    observed hour angle (radians)
**     dob    double*    observed declination (radians)
**     rob    double*    observed right ascension (CIO-based, radians)
**
**  Notes:
**
**  1) This function returns zenith distance rather than altitude in
**     order to reflect the fact that no allowance is made for
**     depression of the horizon.
**
**  2) The accuracy of the result is limited by the corrections for
**     refraction, which use a simple A*tan(z) + B*tan^3(z) model.
**     Providing the meteorological parameters are known accurately and
**     there are no gross local effects, the predicted observed
**     coordinates should be within 0.05 arcsec (optical) or 1 arcsec
**     (radio) for a zenith distance of less than 70 degrees, better
**     than 30 arcsec (optical or radio) at 85 degrees and better
**     than 20 arcmin (optical) or 30 arcmin (radio) at the horizon.
**
**     Without refraction, the complementary functions iauAtioq and
**     iauAtoiq are self-consistent to better than 1 microarcsecond all
**     over the celestial sphere.  With refraction included, consistency
**     falls off at high zenith distances, but is still better than
**     0.05 arcsec at 85 degrees.
**
**  3) It is advisable to take great care with units, as even unlikely
**     values of the input parameters are accepted and processed in
**     accordance with the models used.
**
**  4) The CIRS RA,Dec is obtained from a star catalog mean place by
**     allowing for space motion, parallax, the Sun's gravitational lens
**     effect, annual aberration and precession-nutation.  For star
**     positions in the ICRS, these effects can be applied by means of
**     the iauAtci13 (etc.) functions.  Starting from classical "mean
**     place" systems, additional transformations will be needed first.
**
**  5) "Observed" Az,El means the position that would be seen by a
**     perfect geodetically aligned theodolite.  This is obtained from
**     the CIRS RA,Dec by allowing for Earth orientation and diurnal
**     aberration, rotating from equator to horizon coordinates, and
**     then adjusting for refraction.  The HA,Dec is obtained by
**     rotating back into equatorial coordinates, and is the position
**     that would be seen by a perfect equatorial with its polar axis
**     aligned to the Earth's axis of rotation.  Finally, the RA is
**     obtained by subtracting the HA from the local ERA.
**
**  6) The star-independent CIRS-to-observed-place parameters in ASTROM
**     may be computed with iauApio[13] or iauApco[13].  If nothing has
**     changed significantly except the time, iauAper[13] may be used to
**     perform the requisite adjustment to the astrom structure.
**
**  Called:
**     iauS2c       spherical coordinates to unit vector
**     iauC2s       p-vector to spherical
**     iauAnp       normalize angle into range 0 to 2pi
**
**  This revision:   2016 March 9
**
**  SOFA release 2016-05-03
**
**  Copyright (C) 2016 IAU SOFA Board.  See notes at end.
*/
{
   var aob = 0.0;;
   var zob = 0.0;;
   var hob = 0.0;;
   var dob = 0.0;;
   var rob = 0.0;;
   var _rv2;

/* Minimum cos(alt) and sin(alt) for refraction purposes */
   var CELMIN = 1e-6;
   var SELMIN = 0.05;

   var v = [], x, y, z, xhd, yhd, zhd, f, xhdt, yhdt, zhdt, xaet, yaet, zaet, azobs, r, tz, w, del, cosdel, xaeo, yaeo, zaeo, zdobs, hmobs, dcobs, raobs;


/* CIRS RA,Dec to Cartesian -HA,Dec. */
   v = iauS2c(ri-astrom.eral, di);
   x = v[0];
   y = v[1];
   z = v[2];

/* Polar motion. */
   xhd = x + astrom.xpl*z;
   yhd = y - astrom.ypl*z;
   zhd = z - astrom.xpl*x + astrom.ypl*y;

/* Diurnal aberration. */
   f = ( 1.0 - astrom.diurab*yhd );
   xhdt = f * xhd;
   yhdt = f * ( yhd + astrom.diurab );
   zhdt = f * zhd;

/* Cartesian -HA,Dec to Cartesian Az,El (S=0,E=90). */
   xaet = astrom.sphi*xhdt - astrom.cphi*zhdt;
   yaet = yhdt;
   zaet = astrom.cphi*xhdt + astrom.sphi*zhdt;

/* Azimuth (N=0,E=90). */
   azobs = ( xaet != 0.0 || yaet != 0.0 ) ? Math.atan2(yaet,-xaet) : 0.0;

/* ---------- */
/* Refraction */
/* ---------- */

/* Cosine and sine of altitude, with precautions. */
   r = Math.sqrt(xaet*xaet + yaet*yaet);
   r = r > CELMIN ? r : CELMIN;
   z = zaet > SELMIN ? zaet : SELMIN;

/* A*tan(z)+B*tan^3(z) model, with Newton-Raphson correction. */
   tz = r/z;
   w = astrom.refb*tz*tz;
   del = ( astrom.refa + w ) * tz /
         ( 1.0 + ( astrom.refa + 3.0*w ) / ( z*z ) );

/* Apply the change, giving observed vector. */
   cosdel = 1.0 - del*del/2.0;
   f = cosdel - del*z/r;
   xaeo = xaet*f;
   yaeo = yaet*f;
   zaeo = cosdel*zaet + del*r;

/* Observed ZD. */
   zdobs = Math.atan2(Math.sqrt(xaeo*xaeo+yaeo*yaeo), zaeo);

/* Az/El vector to HA,Dec vector (both right-handed). */
   v[0] = astrom.sphi*xaeo + astrom.cphi*zaeo;
   v[1] = yaeo;
   v[2] = - astrom.cphi*xaeo + astrom.sphi*zaeo;

/* To spherical -HA,Dec. */
   (_rv2 = iauC2s(v))[0];
   hmobs = _rv2[0];
   dcobs = _rv2[1];

/* Right ascension (with respect to CIO). */
   raobs = astrom.eral + hmobs;

/* Return the results. */
   aob = iauAnp(azobs);
   zob = zdobs;
   hob = -hmobs;
   dob = dcobs;
   rob = iauAnp(raobs);

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

return [aob, zob, hob, dob, rob];
}