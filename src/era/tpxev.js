function eraTpxev(v, v0)
/*
**  - - - - - - - - -
**   e r a T p x e v
**  - - - - - - - - -
**
**  In the tangent plane projection, given celestial direction cosines
**  for a star and the tangent point, solve for the star's rectangular
**  coordinates in the tangent plane.
**
**  Given:
**     v         double[3]  direction cosines of star (Note 4)
**     v0        double[3]  direction cosines of tangent point (Note 4)
**
**  Returned:
**     *xi,*eta  double     tangent plane coordinates of star
**
**  Returned (function value):
**               int        status: 0 = OK
**                                  1 = star too far from axis
**                                  2 = antistar on tangent plane
**                                  3 = antistar too far from axis
**
**  Notes:
**
**  1) The tangent plane projection is also called the "gnomonic
**     projection" and the "central projection".
**
**  2) The eta axis points due north in the adopted coordinate system.
**     If the direction cosines represent observed (RA,Dec), the tangent
**     plane coordinates (xi,eta) are conventionally called the
**     "standard coordinates".  If the direction cosines are with
**     respect to a right-handed triad, (xi,eta) are also right-handed.
**     The units of (xi,eta) are, effectively, radians at the tangent
**     point.
**
**  3) The method used is to extend the star vector to the tangent
**     plane and then rotate the triad so that (x,y) becomes (xi,eta).
**     Writing (a,b) for the celestial spherical coordinates of the
**     star, the sequence of rotations is (a+pi/2) around the z-axis
**     followed by (pi/2-b) around the x-axis.
**
**  4) If vector v0 is not of unit length, or if vector v is of zero
**     length, the results will be wrong.
**
**  5) If v0 points at a pole, the returned (xi,eta) will be based on
**     the arbitrary assumption that the longitude coordinate of the
**     tangent point is zero.
**
**  6) This function is a member of the following set:
**
**         spherical      vector         solve for
**
**         eraTpxes    > eraTpxev <       xi,eta
**         eraTpsts      eraTpstv          star
**         eraTpors      eraTporv         origin
**
**  References:
**
**     Calabretta M.R. & Greisen, E.W., 2002, "Representations of
**     celestial coordinates in FITS", Astron.Astrophys. 395, 1077
**
**     Green, R.M., "Spherical Astronomy", Cambridge University Press,
**     1987, Chapter 13.
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var xi = 0.0;;
   var eta = 0.0;;


   var TINY = 1e-6;
   var j;
   var x, y, z, x0, y0, z0, r2, r, w, d;


/* Star and tangent point. */
   x = v[0];
   y = v[1];
   z = v[2];
   x0 = v0[0];
   y0 = v0[1];
   z0 = v0[2];

/* Deal with polar case. */
   r2 = x0*x0 + y0*y0;
   r = Math.sqrt(r2);
   if ( r == 0.0 ) {
      r = 1e-20;
      x0 = r;
   }

/* Reciprocal of star vector length to tangent plane. */
   w = x*x0 + y*y0;
   d = w + z*z0;

/* Check for error cases. */
   if ( d > TINY ) {
      j = 0;
   } else if ( d >= 0.0 ) {
      j = 1;
      d = TINY;
   } else if ( d > -TINY ) {
      j = 2;
      d = -TINY;
   } else {
      j = 3;
   }

/* Return the tangent plane coordinates (even in dubious cases). */
   d *= r;
   xi = (y*x0 - x*y0) / d;
   eta = (z*r2 - z0*w) / d;

/* Return the status. */
   return [ j, xi, eta ];

/* Finished. */

}
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
