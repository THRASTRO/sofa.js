function iauD2dtf(scale, ndp, d1, d2)
/*
**  - - - - - - - - -
**   i a u D 2 d t f
**  - - - - - - - - -
**
**  Format for output a 2-part Julian Date (or in the case of UTC a
**  quasi-JD form that includes special provision for leap seconds).
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
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
**     special measures are taken.  The SOFA internal convention is that
**     the quasi-JD day represents UTC days whether the length is 86399,
**     86400 or 86401 SI seconds.  In the 1960-1972 era there were
**     smaller jumps (in either direction) each time the linear UTC(TAI)
**     expression was changed, and these "mini-leaps" are also included
**     in the SOFA convention.
**
**  5) The warning status "dubious year" flags UTCs that predate the
**     introduction of the time scale or that are too far in the future
**     to be trusted.  See iauDat for further details.
**
**  6) For calendar conventions and limitations, see iauCal2jd.
**
**  Called:
**     iauJd2cal    JD to Gregorian calendar
**     iauD2tf      decompose days to hms
**     iauDat       delta(AT) = TAI-UTC
**
**  This revision:  2014 February 15
**
**  SOFA release 2016-05-03
**
**  Copyright (C) 2016 IAU SOFA Board.  See notes at end.
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
   js = ~~((_rv1 = iauJd2cal(a1, b1))[0]);
   iy1 = ~~(_rv1[1]);
   im1 = ~~(_rv1[2]);
   id1 = ~~(_rv1[3]);
   fd = _rv1[4];
   if ( js ) return [ -1, iy, im, id, ihmsf ];

/* Is this a leap second day? */
   leap = 0;
   if ( ! ((scale) !== ("UTC")) ) {

   /* TAI-UTC at 0h today. */
      js = ~~((_rv2 = iauDat(iy1, im1, id1, 0.0))[0]);
   dat0 = _rv2[1];
      if ( js < 0 ) return [ -1, iy, im, id, ihmsf ];

   /* TAI-UTC at 12h today (to detect drift). */
      js = ~~((_rv3 = iauDat(iy1, im1, id1, 0.5))[0]);
   dat12 = _rv3[1];
      if ( js < 0 ) return [ -1, iy, im, id, ihmsf ];

   /* TAI-UTC at 0h tomorrow (to detect jumps). */
      js = ~~((_rv4 = iauJd2cal(a1+1.5, b1-fd))[0]);
   iy2 = ~~(_rv4[1]);
   im2 = ~~(_rv4[2]);
   id2 = ~~(_rv4[3]);
   w = _rv4[4];
      if ( js ) return [ -1, iy, im, id, ihmsf ];
      js = ~~((_rv5 = iauDat(iy2, im2, id2, 0.0))[0]);
   dat24 = _rv5[1];
      if ( js < 0 ) return [ -1, iy, im, id, ihmsf ];

   /* Any sudden change in TAI-UTC (seconds). */
      dleap = dat24 - (2.0*dat12 - dat0);

   /* If leap second day, scale the fraction of a day into SI. */
      leap = ~~((dleap != 0.0));
      if (leap) fd += fd * dleap/DAYSEC;
   }

/* Provisional time of day. */
   (_rv6 = iauD2tf(ndp, fd))[0];
   s = _rv6[0];
   ihmsf1 = _rv6[1];

/* Has the (rounded) time gone past 24h? */
   if ( ihmsf1[0] > 23 ) {

   /* Yes.  We probably need tomorrow's calendar date. */
      js = ~~((_rv7 = iauJd2cal(a1+1.5, b1-fd))[0]);
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
