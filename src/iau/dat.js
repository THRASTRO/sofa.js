function iauDat(iy, im, id, fd)
/*
**  - - - - - - -
**   i a u D a t
**  - - - - - - -
**
**  For a given UTC date, calculate Delta(AT) = TAI-UTC.
**
**     :------------------------------------------:
**     :                                          :
**     :                 IMPORTANT                :
**     :                                          :
**     :  A new version of this function must be  :
**     :  produced whenever a new leap second is  :
**     :  announced.  There are four items to     :
**     :  change on each such occasion:           :
**     :                                          :
**     :  1) A new line must be added to the set  :
**     :     of statements that initialize the    :
**     :     array "changes".                     :
**     :                                          :
**     :  2) The constant IYV must be set to the  :
**     :     current year.                        :
**     :                                          :
**     :  3) The "Latest leap second" comment     :
**     :     below must be set to the new leap    :
**     :     second date.                         :
**     :                                          :
**     :  4) The "This revision" comment, later,  :
**     :     must be set to the current date.     :
**     :                                          :
**     :  Change (2) must also be carried out     :
**     :  whenever the function is re-issued,     :
**     :  even if no leap seconds have been       :
**     :  added.                                  :
**     :                                          :
**     :  Latest leap second:  2016 December 31   :
**     :                                          :
**     :__________________________________________:
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards Of Fundamental Astronomy) software collection.
**
**  Status:  user-replaceable support function.
**
**  Given:
**     iy     int      UTC:  year (Notes 1 and 2)
**     im     int            month (Note 2)
**     id     int            day (Notes 2 and 3)
**     fd     double         fraction of day (Note 4)
**
**  Returned:
**     deltat double   TAI minus UTC, seconds
**
**  Returned (function value):
**            int      status (Note 5):
**                       1 = dubious year (Note 1)
**                       0 = OK
**                      -1 = bad year
**                      -2 = bad month
**                      -3 = bad day (Note 3)
**                      -4 = bad fraction (Note 4)
**                      -5 = internal error (Note 5)
**
**  Notes:
**
**  1) UTC began at 1960 January 1.0 (JD 2436934.5) and it is improper
**     to call the function with an earlier date.  If this is attempted,
**     zero is returned together with a warning status.
**
**     Because leap seconds cannot, in principle, be predicted in
**     advance, a reliable check for dates beyond the valid range is
**     impossible.  To guard against gross errors, a year five or more
**     after the release year of the present function (see the constant
**     IYV) is considered dubious.  In this case a warning status is
**     returned but the result is computed in the normal way.
**
**     For both too-early and too-late years, the warning status is +1.
**     This is distinct from the error status -1, which signifies a year
**     so early that JD could not be computed.
**
**  2) If the specified date is for a day which ends with a leap second,
**     the TAI-UTC value returned is for the period leading up to the
**     leap second.  If the date is for a day which begins as a leap
**     second ends, the TAI-UTC returned is for the period following the
**     leap second.
**
**  3) The day number must be in the normal calendar range, for example
**     1 through 30 for April.  The "almanac" convention of allowing
**     such dates as January 0 and December 32 is not supported in this
**     function, in order to avoid confusion near leap seconds.
**
**  4) The fraction of day is used only for dates before the
**     introduction of leap seconds, the first of which occurred at the
**     end of 1971.  It is tested for validity (0 to 1 is the valid
**     range) even if not used;  if invalid, zero is used and status -4
**     is returned.  For many applications, setting fd to zero is
**     acceptable;  the resulting error is always less than 3 ms (and
**     occurs only pre-1972).
**
**  5) The status value returned in the case where there are multiple
**     errors refers to the first error detected.  For example, if the
**     month and day are 13 and 32 respectively, status -2 (bad month)
**     will be returned.  The "internal error" status refers to a
**     case that is impossible but causes some compilers to issue a
**     warning.
**
**  6) In cases where a valid result is not available, zero is returned.
**
**  References:
**
**  1) For dates from 1961 January 1 onwards, the expressions from the
**     file ftp://maia.usno.navy.mil/ser7/tai-utc.dat are used.
**
**  2) The 5ms timestep at 1961 January 1 is taken from 2.58.1 (p87) of
**     the 1992 Explanatory Supplement.
**
**  Called:
**     iauCal2jd    Gregorian calendar to JD
**
**  This revision:  2017 October 7
**
**  SOFA release 2018-01-30
**
**  Copyright (C) 2018 IAU SOFA Board.  See notes at end.
*/
{
   var deltat = 0.0;;
   var _rv1;

/* Release year for this version of iauDat */
   var IYV = 2017;

/* Reference dates (MJD) and drift rates (s/day), pre leap seconds */
   var                 drift = [
      [ 37300.0, 0.0012960 ],
      [ 37300.0, 0.0012960 ],
      [ 37300.0, 0.0012960 ],
      [ 37665.0, 0.0011232 ],
      [ 37665.0, 0.0011232 ],
      [ 38761.0, 0.0012960 ],
      [ 38761.0, 0.0012960 ],
      [ 38761.0, 0.0012960 ],
      [ 38761.0, 0.0012960 ],
      [ 38761.0, 0.0012960 ],
      [ 38761.0, 0.0012960 ],
      [ 38761.0, 0.0012960 ],
      [ 39126.0, 0.0025920 ],
      [ 39126.0, 0.0025920 ]
   ];

/* Number of Delta(AT) expressions before leap seconds were introduced */
   var NERA1 = drift.length;

/* Dates and Delta(AT)s */
   changes = [
      [ 1960,  1,  1.4178180 ],
      [ 1961,  1,  1.4228180 ],
      [ 1961,  8,  1.3728180 ],
      [ 1962,  1,  1.8458580 ],
      [ 1963, 11,  1.9458580 ],
      [ 1964,  1,  3.2401300 ],
      [ 1964,  4,  3.3401300 ],
      [ 1964,  9,  3.4401300 ],
      [ 1965,  1,  3.5401300 ],
      [ 1965,  3,  3.6401300 ],
      [ 1965,  7,  3.7401300 ],
      [ 1965,  9,  3.8401300 ],
      [ 1966,  1,  4.3131700 ],
      [ 1968,  2,  4.2131700 ],
      [ 1972,  1, 10.0       ],
      [ 1972,  7, 11.0       ],
      [ 1973,  1, 12.0       ],
      [ 1974,  1, 13.0       ],
      [ 1975,  1, 14.0       ],
      [ 1976,  1, 15.0       ],
      [ 1977,  1, 16.0       ],
      [ 1978,  1, 17.0       ],
      [ 1979,  1, 18.0       ],
      [ 1980,  1, 19.0       ],
      [ 1981,  7, 20.0       ],
      [ 1982,  7, 21.0       ],
      [ 1983,  7, 22.0       ],
      [ 1985,  7, 23.0       ],
      [ 1988,  1, 24.0       ],
      [ 1990,  1, 25.0       ],
      [ 1991,  1, 26.0       ],
      [ 1992,  7, 27.0       ],
      [ 1993,  7, 28.0       ],
      [ 1994,  7, 29.0       ],
      [ 1996,  1, 30.0       ],
      [ 1997,  7, 31.0       ],
      [ 1999,  1, 32.0       ],
      [ 2006,  1, 33.0       ],
      [ 2009,  1, 34.0       ],
      [ 2012,  7, 35.0       ],
      [ 2015,  7, 36.0       ],
      [ 2017,  1, 37.0       ]
   ];

/* Number of Delta(AT) changes */
   var NDAT = changes.length;

/* Miscellaneous local variables */
   var j, i, m;
   var da, djm0, djm;


/* Initialize the result to zero. */
   deltat = da = 0.0;

/* If invalid fraction of a day, set error status and give up. */
   if (fd < 0.0 || fd > 1.0) return [ -4, deltat  ];

/* Convert the date into an MJD. */
   j = ~~((_rv1 = iauCal2jd(iy, im, id))[0]);
   djm0 = _rv1[1];
   djm = _rv1[2];

/* If invalid year, month, or day, give up. */
   if (j < 0) return [ j, deltat  ];

/* If pre-UTC year, set warning status and give up. */
   if (iy < changes[0][0]) return [ 1, deltat  ];

/* If suspiciously late year, set warning status but proceed. */
   if (iy > IYV + 5) j = 1;

/* Combine year and month to form a date-ordered integer... */
   m = ~~(12*iy + im);

/* ...and use it to find the preceding table entry. */
   for (i = ~~(NDAT-1); i >=0; i--) {
      if (m >= (12 * changes[i][0] + changes[i][1])) break;
   }

/* Prevent underflow warnings. */
   if (i < 0) return [ -5, deltat  ];

/* Get the Delta(AT). */
   da = changes[i][2];

/* If pre-1972, adjust for drift. */
   if (i < NERA1) da += (djm + fd - drift[i][0]) * drift[i][1];

/* Return the Delta(AT) value. */
   deltat = da;

/* Return the status. */
   return [ j, deltat  ];

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
