function eraD2dtf(scale, ndp, d1, d2)
/*
**  - - - - - - - - -
**   e r a D 2 d t f
**  - - - - - - - - -
**
**  Format for output a 2-part Julian Date (or in the case of UTC a
**  quasi-JD form that includes special provision for leap seconds).
**
**  Given:
**     scale     char[]  time scale ID (Note 1)
**     ndp       int     resolution (Note 2)
**     d1,d2     double  time as a 2-part Julian Date (Notes 3,4)
**
**  Returned:
**     iy,im,id  int     year, month, day in Gregorian calendar (Note 5)
**     ihmsf     int[4]  hours, minutes, seconds, fraction (Note 1)
**
**  Returned (function value):
**               int     status: +1 = dubious year (Note 5)
**                                0 = OK
**                               -1 = unacceptable date (Note 6)
**
**  Notes:
**
**  1) scale identifies the time scale.  Only the value "UTC" (in upper
**     case) is significant, and enables handling of leap seconds (see
**     Note 4).
**
**  2) ndp is the number of decimal places in the seconds field, and can
**     have negative as well as positive values, such as:
**
**     ndp         resolution
**     -4            1 00 00
**     -3            0 10 00
**     -2            0 01 00
**     -1            0 00 10
**      0            0 00 01
**      1            0 00 00.1
**      2            0 00 00.01
**      3            0 00 00.001
**
**     The limits are platform dependent, but a safe range is -5 to +9.
**
**  3) d1+d2 is Julian Date, apportioned in any convenient way between
**     the two arguments, for example where d1 is the Julian Day Number
**     and d2 is the fraction of a day.  In the case of UTC, where the
**     use of JD is problematical, special conventions apply:  see the
**     next note.
**
**  4) JD cannot unambiguously represent UTC during a leap second unless
**     special measures are taken.  The ERFA internal convention is that
**     the quasi-JD day represents UTC days whether the length is 86399,
**     86400 or 86401 SI seconds.  In the 1960-1972 era there were
**     smaller jumps (in either direction) each time the linear UTC(TAI)
**     expression was changed, and these "mini-leaps" are also included
**     in the ERFA convention.
**
**  5) The warning status "dubious year" flags UTCs that predate the
**     introduction of the time scale or that are too far in the future
**     to be trusted.  See eraDat for further details.
**
**  6) For calendar conventions and limitations, see eraCal2jd.
**
**  Called:
**     eraJd2cal    JD to Gregorian calendar
**     eraD2tf      decompose days to hms
**     eraDat       delta(AT) = TAI-UTC
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
   var ihmsf = [0,0,0,0];;
   var _rv1, _rv2, _rv3, _rv4, _rv5, _rv6, _rv7;

   var leap;
   var s;
   var iy1, im1, id1, js, iy2, im2, id2, ihmsf1 = [], i;
   var a1, b1, fd, dat0, dat12, w, dat24, dleap;


/* The two-part JD. */
   a1 = d1;
   b1 = d2;

/* Provisional calendar date. */
   js = ~~((_rv1 = eraJd2cal(a1, b1))[0]);
   iy1 = ~~(_rv1[1]);
   im1 = ~~(_rv1[2]);
   id1 = ~~(_rv1[3]);
   fd = _rv1[4];
   if ( js ) return [ -1, iy, im, id, ihmsf ];

/* Is this a leap second day? */
   leap = 0;
   if ( ! ((scale) !== ("UTC")) ) {

   /* TAI-UTC at 0h today. */
      js = ~~((_rv2 = eraDat(iy1, im1, id1, 0.0))[0]);
   dat0 = _rv2[1];
      if ( js < 0 ) return [ -1, iy, im, id, ihmsf ];

   /* TAI-UTC at 12h today (to detect drift). */
      js = ~~((_rv3 = eraDat(iy1, im1, id1, 0.5))[0]);
   dat12 = _rv3[1];
      if ( js < 0 ) return [ -1, iy, im, id, ihmsf ];

   /* TAI-UTC at 0h tomorrow (to detect jumps). */
      js = ~~((_rv4 = eraJd2cal(a1+1.5, b1-fd))[0]);
   iy2 = ~~(_rv4[1]);
   im2 = ~~(_rv4[2]);
   id2 = ~~(_rv4[3]);
   w = _rv4[4];
      if ( js ) return [ -1, iy, im, id, ihmsf ];
      js = ~~((_rv5 = eraDat(iy2, im2, id2, 0.0))[0]);
   dat24 = _rv5[1];
      if ( js < 0 ) return [ -1, iy, im, id, ihmsf ];

   /* Any sudden change in TAI-UTC (seconds). */
      dleap = dat24 - (2.0*dat12 - dat0);

   /* If leap second day, scale the fraction of a day into SI. */
      leap = ~~((Math.abs(dleap) > 0.5));
      if (leap) fd += fd * dleap/ERFA_DAYSEC;
   }

/* Provisional time of day. */
   (_rv6 = eraD2tf(ndp, fd))[0];
   s = _rv6[0];
   ihmsf1 = _rv6[1];

/* Has the (rounded) time gone past 24h? */
   if ( ihmsf1[0] > 23 ) {

   /* Yes.  We probably need tomorrow's calendar date. */
      js = ~~((_rv7 = eraJd2cal(a1+1.5, b1-fd))[0]);
   iy2 = ~~(_rv7[1]);
   im2 = ~~(_rv7[2]);
   id2 = ~~(_rv7[3]);
   w = _rv7[4];
      if ( js ) return [ -1, iy, im, id, ihmsf ];

   /* Is today a leap second day? */
      if ( ! leap ) {

      /* No.  Use 0h tomorrow. */
         iy1 = ~~(iy2);
         im1 = ~~(im2);
         id1 = ~~(id2);
         ihmsf1[0] = 0;
         ihmsf1[1] = 0;
         ihmsf1[2] = 0;

      } else {

      /* Yes.  Are we past the leap second itself? */
         if ( ihmsf1[2] > 0 ) {

         /* Yes.  Use tomorrow but allow for the leap second. */
            iy1 = ~~(iy2);
            im1 = ~~(im2);
            id1 = ~~(id2);
            ihmsf1[0] = 0;
            ihmsf1[1] = 0;
            ihmsf1[2] = 0;

         } else {

         /* No.  Use 23 59 60... today. */
            ihmsf1[0] = 23;
            ihmsf1[1] = 59;
            ihmsf1[2] = 60;
         }

      /* If rounding to 10s or coarser always go up to new day. */
         if ( ndp < 0 && ihmsf1[2] == 60 ) {
            iy1 = ~~(iy2);
            im1 = ~~(im2);
            id1 = ~~(id2);
            ihmsf1[0] = 0;
            ihmsf1[1] = 0;
            ihmsf1[2] = 0;
         }
      }
   }

/* Results. */
   iy = ~~(iy1);
   im = ~~(im1);
   id = ~~(id1);
   for ( i = 0; i < 4; i++ ) {
      ihmsf[i] = ihmsf1[i];
   }

/* Status. */
   return [ js, iy, im, id, ihmsf ];

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
