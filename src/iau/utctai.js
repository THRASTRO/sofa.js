function iauUtctai(utc1, utc2)
/*
**  - - - - - - - - - -
**   i a u U t c t a i
**  - - - - - - - - - -
**
**  Time scale transformation:  Coordinated Universal Time, UTC, to
**  International Atomic Time, TAI.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  canonical.
**
**  Given:
**     utc1,utc2  double   UTC as a 2-part quasi Julian Date (Notes 1-4)
**
**  Returned:
**     tai1,tai2  double   TAI as a 2-part Julian Date (Note 5)
**
**  Returned (function value):
**                int      status: +1 = dubious year (Note 3)
**                                  0 = OK
**                                 -1 = unacceptable date
**
**  Notes:
**
**  1) utc1+utc2 is quasi Julian Date (see Note 2), apportioned in any
**     convenient way between the two arguments, for example where utc1
**     is the Julian Day Number and utc2 is the fraction of a day.
**
**  2) JD cannot unambiguously represent UTC during a leap second unless
**     special measures are taken.  The convention in the present
**     function is that the JD day represents UTC days whether the
**     length is 86399, 86400 or 86401 SI seconds.  In the 1960-1972 era
**     there were smaller jumps (in either direction) each time the
**     linear UTC(TAI) expression was changed, and these "mini-leaps"
**     are also included in the SOFA convention.
**
**  3) The warning status "dubious year" flags UTCs that predate the
**     introduction of the time scale or that are too far in the future
**     to be trusted.  See iauDat for further details.
**
**  4) The function iauDtf2d converts from calendar date and time of day
**     into 2-part Julian Date, and in the case of UTC implements the
**     leap-second-ambiguity convention described above.
**
**  5) The returned TAI1,TAI2 are such that their sum is the TAI Julian
**     Date.
**
**  Called:
**     iauJd2cal    JD to Gregorian calendar
**     iauDat       delta(AT) = TAI-UTC
**     iauCal2jd    Gregorian calendar to JD
**
**  References:
**
**     McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
**     IERS Technical Note No. 32, BKG (2004)
**
**     Explanatory Supplement to the Astronomical Almanac,
**     P. Kenneth Seidelmann (ed), University Science Books (1992)
**
**  This revision:  2013 July 26
**
**  SOFA release 2018-01-30
**
**  Copyright (C) 2018 IAU SOFA Board.  See notes at end.
**
*/
{
   var tai1 = 0.0;;
   var tai2 = 0.0;;
   var _rv1, _rv2, _rv3, _rv4, _rv5, _rv6;

   var big1;
   var iy, im, id, j, iyt, imt, idt;
   var u1, u2, fd, dat0, dat12, w, dat24, dlod, dleap, z1, z2, a2;


/* Put the two parts of the UTC into big-first order. */
   big1 = ~~(( utc1 >= utc2 ));
   if ( big1 ) {
      u1 = utc1;
      u2 = utc2;
   } else {
      u1 = utc2;
      u2 = utc1;
   }

/* Get TAI-UTC at 0h today. */
   j = ~~((_rv1 = iauJd2cal(u1, u2))[0]);
   iy = ~~(_rv1[1]);
   im = ~~(_rv1[2]);
   id = ~~(_rv1[3]);
   fd = _rv1[4];
   if ( j ) return [ j, tai1, tai2 ];
   j = ~~((_rv2 = iauDat(iy, im, id, 0.0))[0]);
   dat0 = _rv2[1];
   if ( j < 0 ) return [ j, tai1, tai2 ];

/* Get TAI-UTC at 12h today (to detect drift). */
   j = ~~((_rv3 = iauDat(iy, im, id, 0.5))[0]);
   dat12 = _rv3[1];
   if ( j < 0 ) return [ j, tai1, tai2 ];

/* Get TAI-UTC at 0h tomorrow (to detect jumps). */
   j = ~~((_rv4 = iauJd2cal(u1+1.5, u2-fd))[0]);
   iyt = ~~(_rv4[1]);
   imt = ~~(_rv4[2]);
   idt = ~~(_rv4[3]);
   w = _rv4[4];
   if ( j ) return [ j, tai1, tai2 ];
   j = ~~((_rv5 = iauDat(iyt, imt, idt, 0.0))[0]);
   dat24 = _rv5[1];
   if ( j < 0 ) return [ j, tai1, tai2 ];

/* Separate TAI-UTC change into per-day (DLOD) and any jump (DLEAP). */
   dlod = 2.0 * (dat12 - dat0);
   dleap = dat24 - (dat0 + dlod);

/* Remove any scaling applied to spread leap into preceding day. */
   fd *= (DAYSEC+dleap)/DAYSEC;

/* Scale from (pre-1972) UTC seconds to SI seconds. */
   fd *= (DAYSEC+dlod)/DAYSEC;

/* Today's calendar date to 2-part JD. */
   var __rv__ = (_rv6 = iauCal2jd(iy, im, id))[0];
   z1 = _rv6[1];
   z2 = _rv6[2];
   if(__rv__) return [ -1, tai1, tai2 ];

/* Assemble the TAI result, preserving the UTC split and order. */
   a2 = z1 - u1;
   a2 += z2;
   a2 += fd + dat0/DAYSEC;
   if ( big1 ) {
      tai1 = u1;
      tai2 = a2;
   } else {
      tai1 = a2;
      tai2 = u1;
   }

/* Status. */
   return [ j, tai1, tai2 ];

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
