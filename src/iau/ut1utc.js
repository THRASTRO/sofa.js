function iauUt1utc(ut11, ut12, dut1)
/*
**  - - - - - - - - - -
**   i a u U t 1 u t c
**  - - - - - - - - - -
**
**  Time scale transformation:  Universal Time, UT1, to Coordinated
**  Universal Time, UTC.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  canonical.
**
**  Given:
**     ut11,ut12  double   UT1 as a 2-part Julian Date (Note 1)
**     dut1       double   Delta UT1: UT1-UTC in seconds (Note 2)
**
**  Returned:
**     utc1,utc2  double   UTC as a 2-part quasi Julian Date (Notes 3,4)
**
**  Returned (function value):
**                int      status: +1 = dubious year (Note 5)
**                                  0 = OK
**                                 -1 = unacceptable date
**
**  Notes:
**
**  1) ut11+ut12 is Julian Date, apportioned in any convenient way
**     between the two arguments, for example where ut11 is the Julian
**     Day Number and ut12 is the fraction of a day.  The returned utc1
**     and utc2 form an analogous pair, except that a special convention
**     is used, to deal with the problem of leap seconds - see Note 3.
**
**  2) Delta UT1 can be obtained from tabulations provided by the
**     International Earth Rotation and Reference Systems Service.  The
**     value changes abruptly by 1s at a leap second;  however, close to
**     a leap second the algorithm used here is tolerant of the "wrong"
**     choice of value being made.
**
**  3) JD cannot unambiguously represent UTC during a leap second unless
**     special measures are taken.  The convention in the present
**     function is that the returned quasi JD day UTC1+UTC2 represents
**     UTC days whether the length is 86399, 86400 or 86401 SI seconds.
**
**  4) The function iauD2dtf can be used to transform the UTC quasi-JD
**     into calendar date and clock time, including UTC leap second
**     handling.
**
**  5) The warning status "dubious year" flags UTCs that predate the
**     introduction of the time scale or that are too far in the future
**     to be trusted.  See iauDat for further details.
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
**  This revision:  2013 June 18
**
**  SOFA release 2016-05-03
**
**  Copyright (C) 2016 IAU SOFA Board.  See notes at end.
*/
{
   var utc1 = 0.0;;
   var utc2 = 0.0;;
   var _rv1, _rv2, _rv3;

   var big1;
   var i, iy, im, id, js;
   var duts, u1, u2, d1, dats1, d2, fd, dats2, ddats, us1, us2, du;


/* UT1-UTC in seconds. */
   duts = dut1;

/* Put the two parts of the UT1 into big-first order. */
   big1 = ~~(( ut11 >= ut12 ));
   if ( big1 ) {
      u1 = ut11;
      u2 = ut12;
   } else {
      u1 = ut12;
      u2 = ut11;
   }

/* See if the UT1 can possibly be in a leap-second day. */
   d1 = u1;
   dats1 = 0;
   for ( i = -1; i <= 3; i++ ) {
      d2 = u2 + i;
      var __rv__ = (_rv1 = iauJd2cal(d1, d2))[0];
   iy = ~~(_rv1[1]);
   im = ~~(_rv1[2]);
   id = ~~(_rv1[3]);
   fd = _rv1[4];
   if(__rv__) return [ -1, utc1, utc2 ];
      js = ~~((_rv2 = iauDat(iy, im, id, 0.0))[0]);
   dats2 = _rv2[1];
      if ( js < 0 ) return [ -1, utc1, utc2 ];
      if ( i == - 1 ) dats1 = dats2;
      ddats = dats2 - dats1;
      if ( Math.abs(ddats) >= 0.5 ) {

      /* Yes, leap second nearby: ensure UT1-UTC is "before" value. */
         if ( ddats * duts >= 0 ) duts -= ddats;

      /* UT1 for the start of the UTC day that ends in a leap. */
         var __rv__ = (_rv3 = iauCal2jd(iy, im, id))[0];
   d1 = _rv3[1];
   d2 = _rv3[2];
   if(__rv__) return [ -1, utc1, utc2 ];
         us1 = d1;
         us2 = d2 - 1.0 + duts/DAYSEC;

      /* Is the UT1 after this point? */
         du = u1 - us1;
         du += u2 - us2;
         if ( du > 0 ) {

         /* Yes:  fraction of the current UTC day that has elapsed. */
            fd = du * DAYSEC / ( DAYSEC + ddats );

         /* Ramp UT1-UTC to bring about SOFA's JD(UTC) convention. */
            duts += ddats * ( fd <= 1.0 ? fd : 1.0 );
         }

      /* Done. */
         break;
      }
      dats1 = dats2;
   }

/* Subtract the (possibly adjusted) UT1-UTC from UT1 to give UTC. */
   u2 -= duts / DAYSEC;

/* Result, safeguarding precision. */
   if ( big1 ) {
      utc1 = u1;
      utc2 = u2;
   } else {
      utc1 = u2;
      utc2 = u1;
   }

/* Status. */
   return [ js, utc1, utc2 ];

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
