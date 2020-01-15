function eraTpors(xi, eta, a, b)
/*
**  - - - - - - - - -
**   e r a T p o r s
**  - - - - - - - - -
**
**  In the tangent plane projection, given the rectangular coordinates
**  of a star and its spherical coordinates, determine the spherical
**  coordinates of the tangent point.
**
**  Given:
**     xi,eta     double  rectangular coordinates of star image (Note 2)
**     a,b        double  star's spherical coordinates (Note 3)
**
**  Returned:
**     *a01,*b01  double  tangent point's spherical coordinates, Soln. 1
**     *a02,*b02  double  tangent point's spherical coordinates, Soln. 2
**
**  Returned (function value):
**                int     number of solutions:
**                        0 = no solutions returned (Note 5)
**                        1 = only the first solution is useful (Note 6)
**                        2 = both solutions are useful (Note 6)
**
**  Notes:
**
**  1) The tangent plane projection is also called the "gnomonic
**     projection" and the "central projection".
**
**  2) The eta axis points due north in the adopted coordinate system.
**     If the spherical coordinates are observed (RA,Dec), the tangent
**     plane coordinates (xi,eta) are conventionally called the
**     "standard coordinates".  If the spherical coordinates are with
**     respect to a right-handed triad, (xi,eta) are also right-handed.
**     The units of (xi,eta) are, effectively, radians at the tangent
**     point.
**
**  3) All angular arguments are in radians.
**
**  4) The angles a01 and a02 are returned in the range 0-2pi.  The
**     angles b01 and b02 are returned in the range +/-pi, but in the
**     usual, non-pole-crossing, case, the range is +/-pi/2.
**
**  5) Cases where there is no solution can arise only near the poles.
**     For example, it is clearly impossible for a star at the pole
**     itself to have a non-zero xi value, and hence it is meaningless
**     to ask where the tangent point would have to be to bring about
**     this combination of xi and dec.
**
**  6) Also near the poles, cases can arise where there are two useful
**     solutions.  The return value indicates whether the second of the
**     two solutions returned is useful;  1 indicates only one useful
**     solution, the usual case.
**
**  7) The basis of the algorithm is to solve the spherical triangle PSC,
**     where P is the north celestial pole, S is the star and C is the
**     tangent point.  The spherical coordinates of the tangent point are
**     [a0,b0];  writing rho^2 = (xi^2+eta^2) and r^2 = (1+rho^2), side c
**     is then (pi/2-b), side p is sqrt(xi^2+eta^2) and side s (to be
**     found) is (pi/2-b0).  Angle C is given by sin(C) = xi/rho and
**     cos(C) = eta/rho.  Angle P (to be found) is the longitude
**     difference between star and tangent point (a-a0).
**
**  8) This function is a member of the following set:
**
**         spherical      vector         solve for
**
**         eraTpxes      eraTpxev         xi,eta
**         eraTpsts      eraTpstv          star
**       > eraTpors <    eraTporv         origin
**
**  Called:
**     eraAnp       normalize angle into range 0 to 2pi
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
   var a01 = 0.0;;
   var b01 = 0.0;;
   var a02 = 0.0;;
   var b02 = 0.0;;


   var xi2, r, sb, cb, rsb, rcb, w2, w, s, c;


   xi2 = xi*xi;
   r = Math.sqrt(1.0 + xi2 + eta*eta);
   sb = Math.sin(b);
   cb = Math.cos(b);
   rsb = r*sb;
   rcb = r*cb;
   w2 = rcb*rcb - xi2;
   if ( w2 >= 0.0 ) {
      w = Math.sqrt(w2);
      s = rsb - eta*w;
      c = rsb*eta + w;
      if ( xi == 0.0 && w == 0.0 ) w = 1.0;
      a01 = eraAnp(a - Math.atan2(xi, w));
      b01 = Math.atan2(s,c);
      w = -w;
      s = rsb - eta*w;
      c = rsb*eta + w;
      a02 = eraAnp(a - Math.atan2(xi, w));
      b02 = Math.atan2(s,c);
      return [ (Math.abs(rsb) < 1.0) ? 1 : 2, a01, b01, a02, b02 ];
   } else {
      return [ 0, a01, b01, a02, b02 ];
   }

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
