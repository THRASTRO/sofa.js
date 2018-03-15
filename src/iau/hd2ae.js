function iauHd2ae(ha, dec, phi)
/*
**  - - - - - - - - -
**   i a u H d 2 a e
**  - - - - - - - - -
**
**  Equatorial to horizon coordinates:  transform hour angle and
**  declination to azimuth and altitude.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     ha       double       hour angle (local)
**     dec      double       declination
**     phi      double       site latitude
**
**  Returned:
**     *az      double       azimuth
**     *el      double       altitude (informally, elevation)
**
**  Notes:
**
**  1)  All the arguments are angles in radians.
**
**  2)  Azimuth is returned in the range 0-2pi;  north is zero, and east
**      is +pi/2.  Altitude is returned in the range +/- pi/2.
**
**  3)  The latitude phi is pi/2 minus the angle between the Earth's
**      rotation axis and the adopted zenith.  In many applications it
**      will be sufficient to use the published geodetic latitude of the
**      site.  In very precise (sub-arcsecond) applications, phi can be
**      corrected for polar motion.
**
**  4)  The returned azimuth az is with respect to the rotational north
**      pole, as opposed to the ITRS pole, and for sub-arcsecond
**      accuracy will need to be adjusted for polar motion if it is to
**      be with respect to north on a map of the Earth's surface.
**
**  5)  Should the user wish to work with respect to the astronomical
**      zenith rather than the geodetic zenith, phi will need to be
**      adjusted for deflection of the vertical (often tens of
**      arcseconds), and the zero point of the hour angle ha will also
**      be affected.
**
**  6)  The transformation is the same as Vh = Rz(pi)*Ry(pi/2-phi)*Ve,
**      where Vh and Ve are lefthanded unit vectors in the (az,el) and
**      (ha,dec) systems respectively and Ry and Rz are rotations about
**      first the y-axis and then the z-axis.  (n.b. Rz(pi) simply
**      reverses the signs of the x and y components.)  For efficiency,
**      the algorithm is written out rather than calling other utility
**      functions.  For applications that require even greater
**      efficiency, additional savings are possible if constant terms
**      such as functions of latitude are computed once and for all.
**
**  7)  Again for efficiency, no range checking of arguments is carried
**      out.
**
**  Last revision:   2017 September 12
**
**  SOFA release 2018-01-30
**
**  Copyright (C) 2018 IAU SOFA Board.  See notes at end.
*/
{
   var az = 0.0;;
   var el = 0.0;;


   var sh, ch, sd, cd, sp, cp, x, y, z, r, a;


/* Useful trig functions. */
   sh = Math.sin(ha);
   ch = Math.cos(ha);
   sd = Math.sin(dec);
   cd = Math.cos(dec);
   sp = Math.sin(phi);
   cp = Math.cos(phi);

/* Az,Alt unit vector. */
   x = - ch*cd*sp + sd*cp;
   y = - sh*cd;
   z = ch*cd*cp + sd*sp;

/* To spherical. */
   r = Math.sqrt(x*x + y*y);
   a = (r != 0.0) ? Math.atan2(y,x) : 0.0;
   az = (a < 0.0) ? a+D2PI : a;
   el = Math.atan2(z,r);

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

return [az, el];
}