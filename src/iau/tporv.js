function iauTporv(xi, eta, v)
/*
**  - - - - - - - - -
**   i a u T p o r v
**  - - - - - - - - -
**
**  In the tangent plane projection, given the rectangular coordinates
**  of a star and its direction cosines, determine the direction
**  cosines of the tangent point.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     xi,eta   double    rectangular coordinates of star image (Note 2)
**     v        double[3] star's direction cosines (Note 3)
**
**  Returned:
**     v01      double[3] tangent point's direction cosines, Solution 1
**     v02      double[3] tangent point's direction cosines, Solution 2
**
**  Returned (function value):
**                int     number of solutions:
**                        0 = no solutions returned (Note 4)
**                        1 = only the first solution is useful (Note 5)
**                        2 = both solutions are useful (Note 5)
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
**  3) The vector v must be of unit length or the result will be wrong.
**
**  4) Cases where there is no solution can arise only near the poles.
**     For example, it is clearly impossible for a star at the pole
**     itself to have a non-zero xi value, and hence it is meaningless
**     to ask where the tangent point would have to be.
**
**  5) Also near the poles, cases can arise where there are two useful
**     solutions.  The return value indicates whether the second of the
**     two solutions returned is useful;  1 indicates only one useful
**     solution, the usual case.
**
**  6) The basis of the algorithm is to solve the spherical triangle
**     PSC, where P is the north celestial pole, S is the star and C is
**     the tangent point.  Calling the celestial spherical coordinates
**     of the star and tangent point (a,b) and (a0,b0) respectively, and
**     writing rho^2 = (xi^2+eta^2) and r^2 = (1+rho^2), and
**     transforming the vector v into (a,b) in the normal way, side c is
**     then (pi/2-b), side p is sqrt(xi^2+eta^2) and side s (to be
**     found) is (pi/2-b0), while angle C is given by sin(C) = xi/rho
**     and cos(C) = eta/rho;  angle P (to be found) is (a-a0).  After
**     solving the spherical triangle, the result (a0,b0) can be
**     expressed in vector form as v0.
**
**  7) This function is a member of the following set:
**
**         spherical      vector         solve for
**
**         iauTpxes      iauTpxev         xi,eta
**         iauTpsts      iauTpstv          star
**         iauTpors    > iauTporv <       origin
**
**  References:
**
**     Calabretta M.R. & Greisen, E.W., 2002, "Representations of
**     celestial coordinates in FITS", Astron.Astrophys. 395, 1077
**
**     Green, R.M., "Spherical Astronomy", Cambridge University Press,
**     1987, Chapter 13.
**
**  This revision:   2018 January 2
**
**  SOFA release 2018-01-30
**
**  Copyright (C) 2018 IAU SOFA Board.  See notes at end.
*/
{
   var v01 = [0, 0, 0];;
   var v02 = [0, 0, 0];;


   var x, y, z, rxy2, xi2, eta2p1, r, rsb, rcb, w2, w, c;


   x = v[0];
   y = v[1];
   z = v[2];
   rxy2 = x*x + y*y;
   xi2 = xi*xi;
   eta2p1 = eta*eta + 1.0;
   r = Math.sqrt(xi2 + eta2p1);
   rsb = r*z;
   rcb = r*Math.sqrt(x*x + y*y);
   w2 = rcb*rcb - xi2;
   if ( w2 > 0.0 ) {
      w = Math.sqrt(w2);
      c = (rsb*eta + w) / (eta2p1*Math.sqrt(rxy2*(w2+xi2)));
      v01[0] = c * (x*w + y*xi);
      v01[1] = c * (y*w - x*xi);
      v01[2] = (rsb - eta*w) / eta2p1;
      w = - w;
      c = (rsb*eta + w) / (eta2p1*Math.sqrt(rxy2*(w2+xi2)));
      v02[0] = c * (x*w + y*xi);
      v02[1] = c * (y*w - x*xi);
      v02[2] = (rsb - eta*w) / eta2p1;
      return [ (Math.abs(rsb) < 1.0) ? 1 : 2, v01, v02 ];
   } else {
      return [ 0, v01, v02 ];
   }

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

}
