function eraJd2cal(dj1, dj2)
/*
**  - - - - - - - - - -
**   e r a J d 2 c a l
**  - - - - - - - - - -
**
**  Julian Date to Gregorian year, month, day, and fraction of a day.
**
**  Given:
**     dj1,dj2   double   Julian Date (Notes 1, 2)
**
**  Returned (arguments):
**     iy        int      year
**     im        int      month
**     id        int      day
**     fd        double   fraction of day
**
**  Returned (function value):
**               int      status:
**                           0 = OK
**                          -1 = unacceptable date (Note 1)
**
**  Notes:
**
**  1) The earliest valid date is -68569.5 (-4900 March 1).  The
**     largest value accepted is 1e9.
**
**  2) The Julian Date is apportioned in any convenient way between
**     the arguments dj1 and dj2.  For example, JD=2450123.7 could
**     be expressed in any of these ways, among others:
**
**            dj1             dj2
**
**         2450123.7           0.0       (JD method)
**         2451545.0       -1421.3       (J2000 method)
**         2400000.5       50123.2       (MJD method)
**         2450123.5           0.2       (date & time method)
**
**     Separating integer and fraction uses the "compensated summation"
**     algorithm of Kahan-Neumaier to preserve as much precision as
**     possible irrespective of the jd1+jd2 apportionment.
**
**  3) In early eras the conversion is from the "proleptic Gregorian
**     calendar";  no account is taken of the date(s) of adoption of
**     the Gregorian calendar, nor is the AD/BC numbering convention
**     observed.
**
**  References:
**
**     Explanatory Supplement to the Astronomical Almanac,
**     P. Kenneth Seidelmann (ed), University Science Books (1992),
**     Section 12.92 (p604).
**
**     Klein, A., A Generalized Kahan-Babuska-Summation-Algorithm.
**     Computing, 76, 279-293 (2006), Section 3.
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var iy = 0;;
   var im = 0;;
   var id = 0;;
   var fd = 0.0;;


/* Minimum and maximum allowed JD */
   var DJMIN = -68569.5;
   var DJMAX = 1e9;

   var jd, i, l, n, k;
   var dj, f1, f2, d, s, cs, v = [], x, t, f;


/* Verify date is acceptable. */
   dj = dj1 + dj2;
   if (dj < DJMIN || dj > DJMAX) return [ -1, iy, im, id, fd ];

/* Separate day and fraction (where -0.5 <= fraction < 0.5). */
   d = ERFA_DNINT(dj1);
   f1 = dj1 - d;
   jd = ~~(~~d);
   d = ERFA_DNINT(dj2);
   f2 = dj2 - d;
   jd += ~~(~~d);

/* Compute f1+f2+0.5 using compensated summation (Klein 2006). */
   s = 0.5;
   cs = 0.0;
   v[0] = f1;
   v[1] = f2;
   for ( i = 0; i < 2; i++ ) {
      x = v[i];
      t = s + x;
      cs += Math.abs(s) >= Math.abs(x) ? (s-t) + x : (x-t) + s;
      s = t;
      if ( s >= 1.0 ) {
         jd++;
         s -= 1.0;
      }
   }
   f = s + cs;
   cs = f - s;

/* Deal with negative f. */
   if ( f < 0.0 ) {

   /* Compensated summation: assume that |s| <= 1.0. */
      f = s + 1.0;
      cs += (1.0-f) + s;
      s  = f;
      f = s + cs;
      cs = f - s;
      jd--;
   }

/* Deal with f that is 1.0 or more (when rounded to double). */
   if ( (f-1.0) >= -DBL_EPSILON/4.0 ) {

   /* Compensated summation: assume that |s| <= 1.0. */
      t = s - 1.0;
      cs += (s-t) - 1.0;
      s = t;
      f = s + cs;
      if ( -DBL_EPSILON/2.0 < f ) {
         jd++;
         f = Math.max(f, 0.0);
      }
   }

/* Express day in Gregorian calendar. */
   l = ~~(jd + 68569);
   n = ~~(~~((4 * l) / 146097));
   l -= ~~(~~((146097 * n + 3) / 4));
   i = ~~(~~((4000 * (l + 1)) / 1461001));
   l -= ~~(~~((1461 * i) / 4) - 31);
   k = ~~(~~((80 * l) / 2447));
   id = ~~(~~(l - ~~((2447 * k) / 80)));
   l = ~~(k / 11);
   im = ~~(~~(k + 2 - 12 * l));
   iy = ~~(~~(100 * (n - 49) + i + l));
   fd = f;

/* Success. */
   return [ 0, iy, im, id, fd ];

/* Finished. */

}
/*
 *+----------------------------------------------------------------------
 *
 *  ERFA/SOFA functions converted to JS
 *  Copyright (C) 2020 by Marcel Greter
 *  http:://www.github.com/mgreter/sofa.js
 *
 *  The conversion is done by a custom hacked perl script.
 *  Automatically generates QUnit tests for all functions.
 *
 *  Conversion is made from liberfa sources:
 *  https://github.com/liberfa/erfa
 *
 *+----------------------------------------------------------------------
 *  THIS WORK IS RELEASED UNDER THE SAME TERMS AS ERFA:
 *+----------------------------------------------------------------------
 *
 *  Copyright (C) 2013-2014, NumFOCUS Foundation.
 *  All rights reserved.
 *  
 *  This library is derived, with permission, from the International
 *  Astronomical Union's "Standards of Fundamental Astronomy" library,
 *  available from http://www.iausofa.org.
 *  
 *  The ERFA version is intended to retain identical
 *  functionality to the SOFA library, but made distinct through
 *  different function and file names, as set out in the SOFA license
 *  conditions. The SOFA original has a role as a reference standard
 *  for the IAU and IERS, and consequently redistribution is permitted only
 *  in its unaltered state. The ERFA version is not subject to this
 *  restriction and therefore can be included in distributions which do not
 *  support the concept of "read only" software.
 *  
 *  Although the intent is to replicate the SOFA API (other than replacement of
 *  prefix names) and results (with the exception of bugs; any that are
 *  discovered will be fixed), SOFA is not responsible for any errors found
 *  in this version of the library.
 *  
 *  If you wish to acknowledge the SOFA heritage, please acknowledge that
 *  you are using a library derived from SOFA, rather than SOFA itself.
 *  
 *  
 *  TERMS AND CONDITIONS
 *  
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *  
 *  1 Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *  
 *  2 Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *  
 *  3 Neither the name of the Standards Of Fundamental Astronomy Board, the
 *     International Astronomical Union nor the names of its contributors
 *     may be used to endorse or promote products derived from this software
 *     without specific prior written permission.
 *  
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 *  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 *  TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 *  PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 *  HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 *  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *-----------------------------------------------------------------------
*/
