function eraTf2a(s, ihour, imin, sec)
/*
**  - - - - - - - -
**   e r a T f 2 a
**  - - - - - - - -
**
**  Convert hours, minutes, seconds to radians.
**
**  Given:
**     s         char    sign:  '-' = negative, otherwise positive
**     ihour     int     hours
**     imin      int     minutes
**     sec       double  seconds
**
**  Returned:
**     rad       double  angle in radians
**
**  Returned (function value):
**               int     status:  0 = OK
**                                1 = ihour outside range 0-23
**                                2 = imin outside range 0-59
**                                3 = sec outside range 0-59.999...
**
**  Notes:
**
**  1)  The result is computed even if any of the range checks fail.
**
**  2)  Negative ihour, imin and/or sec produce a warning status, but
**      the absolute value is used in the conversion.
**
**  3)  If there are multiple errors, the status value reflects only the
**      first, the smallest taking precedence.
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var rad = 0.0;;


/* Compute the interval. */
   rad = ( s == '-' ? -1.0 : 1.0 ) *
           ( 60.0 * ( 60.0 * ( Math.abs(ihour) ) +
                             ( Math.abs(imin) ) ) +
                                        Math.abs(sec) ) * ERFA_DS2R;

/* Validate arguments and return status. */
   if ( ihour < 0 || ihour > 23 ) return [ 1, rad ];
   if ( imin < 0 || imin > 59 ) return [ 2, rad ];
   if ( sec < 0.0 || sec >= 60.0 ) return [ 3, rad ];
   return [ 0, rad ];

}
/*
 *+----------------------------------------------------------------------
 *
 *  ERFA/SOFA functions converted to JS
 *  Copyright (C) 2019 by Marcel Greter
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
