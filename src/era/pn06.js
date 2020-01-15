function eraPn06(date1, date2, dpsi, deps)
/*
**  - - - - - - - -
**   e r a P n 0 6
**  - - - - - - - -
**
**  Precession-nutation, IAU 2006 model:  a multi-purpose function,
**  supporting classical (equinox-based) use directly and CIO-based use
**  indirectly.
**
**  Given:
**     date1,date2  double          TT as a 2-part Julian Date (Note 1)
**     dpsi,deps    double          nutation (Note 2)
**
**  Returned:
**     epsa         double          mean obliquity (Note 3)
**     rb           double[3][3]    frame bias matrix (Note 4)
**     rp           double[3][3]    precession matrix (Note 5)
**     rbp          double[3][3]    bias-precession matrix (Note 6)
**     rn           double[3][3]    nutation matrix (Note 7)
**     rbpn         double[3][3]    GCRS-to-true matrix (Note 8)
**
**  Notes:
**
**  1)  The TT date date1+date2 is a Julian Date, apportioned in any
**      convenient way between the two arguments.  For example,
**      JD(TT)=2450123.7 could be expressed in any of these ways,
**      among others:
**
**             date1          date2
**
**          2450123.7           0.0       (JD method)
**          2451545.0       -1421.3       (J2000 method)
**          2400000.5       50123.2       (MJD method)
**          2450123.5           0.2       (date & time method)
**
**      The JD method is the most natural and convenient to use in
**      cases where the loss of several decimal digits of resolution
**      is acceptable.  The J2000 method is best matched to the way
**      the argument is handled internally and will deliver the
**      optimum resolution.  The MJD method and the date & time methods
**      are both good compromises between resolution and convenience.
**
**  2)  The caller is responsible for providing the nutation components;
**      they are in longitude and obliquity, in radians and are with
**      respect to the equinox and ecliptic of date.  For high-accuracy
**      applications, free core nutation should be included as well as
**      any other relevant corrections to the position of the CIP.
**
**  3)  The returned mean obliquity is consistent with the IAU 2006
**      precession.
**
**  4)  The matrix rb transforms vectors from GCRS to J2000.0 mean
**      equator and equinox by applying frame bias.
**
**  5)  The matrix rp transforms vectors from J2000.0 mean equator and
**      equinox to mean equator and equinox of date by applying
**      precession.
**
**  6)  The matrix rbp transforms vectors from GCRS to mean equator and
**      equinox of date by applying frame bias then precession.  It is
**      the product rp x rb.
**
**  7)  The matrix rn transforms vectors from mean equator and equinox
**      of date to true equator and equinox of date by applying the
**      nutation (luni-solar + planetary).
**
**  8)  The matrix rbpn transforms vectors from GCRS to true equator and
**      equinox of date.  It is the product rn x rbp, applying frame
**      bias, precession and nutation in that order.
**
**  9)  The X,Y,Z coordinates of the Celestial Intermediate Pole are
**      elements (3,1-3) of the GCRS-to-true matrix, i.e. rbpn[2][0-2].
**
**  10) It is permissible to re-use the same array in the returned
**      arguments.  The arrays are filled in the stated order.
**
**  Called:
**     eraPfw06     bias-precession F-W angles, IAU 2006
**     eraFw2m      F-W angles to r-matrix
**     eraCr        copy r-matrix
**     eraTr        transpose r-matrix
**     eraRxr       product of two r-matrices
**
**  References:
**
**     Capitaine, N. & Wallace, P.T., 2006, Astron.Astrophys. 450, 855
**
**     Wallace, P.T. & Capitaine, N., 2006, Astron.Astrophys. 459, 981
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var epsa = 0.0;;
   var rb = [ [0,0,0], [0,0,0], [0,0,0] ];;
   var rp = [ [0,0,0], [0,0,0], [0,0,0] ];;
   var rbp = [ [0,0,0], [0,0,0], [0,0,0] ];;
   var rn = [ [0,0,0], [0,0,0], [0,0,0] ];;
   var rbpn = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof rb == 'undefined') {
      rb = 0.0;
   }   if (typeof rp == 'undefined') {
      rp = 0.0;
   }   if (typeof rbp == 'undefined') {
      rbp = 0.0;
   }   if (typeof rn == 'undefined') {
      rn = 0.0;
   }   if (typeof rbpn == 'undefined') {
      rbpn = 0.0;
   }   var _rv1, _rv4;

   var gamb, phib, psib, eps, r1 = [[], [], []], r2 = [[], [], []], rt = [[], [], []];


/* Bias-precession Fukushima-Williams angles of J2000.0 = frame bias. */
   (_rv1 = eraPfw06(ERFA_DJM0, ERFA_DJM00))[0];
   gamb = _rv1[0];
   phib = _rv1[1];
   psib = _rv1[2];
   eps = _rv1[3];

/* B matrix. */
   r1 = eraFw2m(gamb, phib, psib, eps);
   rb = eraCr(r1);

/* Bias-precession Fukushima-Williams angles of date. */
   (_rv4 = eraPfw06(date1, date2))[0];
   gamb = _rv4[0];
   phib = _rv4[1];
   psib = _rv4[2];
   eps = _rv4[3];

/* Bias-precession matrix. */
   r2 = eraFw2m(gamb, phib, psib, eps);
   rbp = eraCr(r2);

/* Solve for precession matrix. */
   rt = eraTr(r1);
   rp = eraRxr(r2, rt);

/* Equinox-based bias-precession-nutation matrix. */
   r1 = eraFw2m(gamb, phib, psib + dpsi, eps + deps);
   rbpn = eraCr(r1);

/* Solve for nutation matrix. */
   rt = eraTr(r2);
   rn = eraRxr(r1, rt);

/* Obliquity, mean of date. */
   epsa = eps;

   return [epsa, rb, rp, rbp, rn, rbpn];

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
