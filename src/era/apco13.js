function eraApco13(utc1, utc2, dut1, elong, phi, hm, xp, yp, phpa, tc, rh, wl)
/*
**  - - - - - - - - - -
**   e r a A p c o 1 3
**  - - - - - - - - - -
**
**  For a terrestrial observer, prepare star-independent astrometry
**  parameters for transformations between ICRS and observed
**  coordinates.  The caller supplies UTC, site coordinates, ambient air
**  conditions and observing wavelength, and ERFA models are used to
**  obtain the Earth ephemeris, CIP/CIO and refraction constants.
**
**  The parameters produced by this function are required in the
**  parallax, light deflection, aberration, and bias-precession-nutation
**  parts of the ICRS/CIRS transformations.
**
**  Given:
**     utc1   double     UTC as a 2-part...
**     utc2   double     ...quasi Julian Date (Notes 1,2)
**     dut1   double     UT1-UTC (seconds, Note 3)
**     elong  double     longitude (radians, east +ve, Note 4)
**     phi    double     latitude (geodetic, radians, Note 4)
**     hm     double     height above ellipsoid (m, geodetic, Notes 4,6)
**     xp,yp  double     polar motion coordinates (radians, Note 5)
**     phpa   double     pressure at the observer (hPa = mB, Note 6)
**     tc     double     ambient temperature at the observer (deg C)
**     rh     double     relative humidity at the observer (range 0-1)
**     wl     double     wavelength (micrometers, Note 7)
**
**  Returned:
**     astrom eraASTROM* star-independent astrometry parameters:
**      pmt    double       PM time interval (SSB, Julian years)
**      eb     double[3]    SSB to observer (vector, au)
**      eh     double[3]    Sun to observer (unit vector)
**      em     double       distance from Sun to observer (au)
**      v      double[3]    barycentric observer velocity (vector, c)
**      bm1    double       sqrt(1-|v|^2): reciprocal of Lorenz factor
**      bpn    double[3][3] bias-precession-nutation matrix
**      along  double       longitude + s' (radians)
**      xpl    double       polar motion xp wrt local meridian (radians)
**      ypl    double       polar motion yp wrt local meridian (radians)
**      sphi   double       sine of geodetic latitude
**      cphi   double       cosine of geodetic latitude
**      diurab double       magnitude of diurnal aberration vector
**      eral   double       "local" Earth rotation angle (radians)
**      refa   double       refraction constant A (radians)
**      refb   double       refraction constant B (radians)
**     eo     double*    equation of the origins (ERA-GST)
**
**  Returned (function value):
**            int        status: +1 = dubious year (Note 2)
**                                0 = OK
**                               -1 = unacceptable date
**
**  Notes:
**
**  1)  utc1+utc2 is quasi Julian Date (see Note 2), apportioned in any
**      convenient way between the two arguments, for example where utc1
**      is the Julian Day Number and utc2 is the fraction of a day.
**
**      However, JD cannot unambiguously represent UTC during a leap
**      second unless special measures are taken.  The convention in the
**      present function is that the JD day represents UTC days whether
**      the length is 86399, 86400 or 86401 SI seconds.
**
**      Applications should use the function eraDtf2d to convert from
**      calendar date and time of day into 2-part quasi Julian Date, as
**      it implements the leap-second-ambiguity convention just
**      described.
**
**  2)  The warning status "dubious year" flags UTCs that predate the
**      introduction of the time scale or that are too far in the
**      future to be trusted.  See eraDat for further details.
**
**  3)  UT1-UTC is tabulated in IERS bulletins.  It increases by exactly
**      one second at the end of each positive UTC leap second,
**      introduced in order to keep UT1-UTC within +/- 0.9s.  n.b. This
**      practice is under review, and in the future UT1-UTC may grow
**      essentially without limit.
**
**  4)  The geographical coordinates are with respect to the ERFA_WGS84
**      reference ellipsoid.  TAKE CARE WITH THE LONGITUDE SIGN:  the
**      longitude required by the present function is east-positive
**      (i.e. right-handed), in accordance with geographical convention.
**
**  5)  The polar motion xp,yp can be obtained from IERS bulletins.  The
**      values are the coordinates (in radians) of the Celestial
**      Intermediate Pole with respect to the International Terrestrial
**      Reference System (see IERS Conventions 2003), measured along the
**      meridians 0 and 90 deg west respectively.  For many
**      applications, xp and yp can be set to zero.
**
**      Internally, the polar motion is stored in a form rotated onto
**      the local meridian.
**
**  6)  If hm, the height above the ellipsoid of the observing station
**      in meters, is not known but phpa, the pressure in hPa (=mB), is
**      available, an adequate estimate of hm can be obtained from the
**      expression
**
**            hm = -29.3 * tsl * log ( phpa / 1013.25 );
**
**      where tsl is the approximate sea-level air temperature in K
**      (See Astrophysical Quantities, C.W.Allen, 3rd edition, section
**      52).  Similarly, if the pressure phpa is not known, it can be
**      estimated from the height of the observing station, hm, as
**      follows:
**
**            phpa = 1013.25 * exp ( -hm / ( 29.3 * tsl ) );
**
**      Note, however, that the refraction is nearly proportional to
**      the pressure and that an accurate phpa value is important for
**      precise work.
**
**  7)  The argument wl specifies the observing wavelength in
**      micrometers.  The transition from optical to radio is assumed to
**      occur at 100 micrometers (about 3000 GHz).
**
**  8)  It is advisable to take great care with units, as even unlikely
**      values of the input parameters are accepted and processed in
**      accordance with the models used.
**
**  9)  In cases where the caller wishes to supply his own Earth
**      ephemeris, Earth rotation information and refraction constants,
**      the function eraApco can be used instead of the present function.
**
**  10) This is one of several functions that inserts into the astrom
**      structure star-independent parameters needed for the chain of
**      astrometric transformations ICRS <-> GCRS <-> CIRS <-> observed.
**
**      The various functions support different classes of observer and
**      portions of the transformation chain:
**
**          functions         observer        transformation
**
**       eraApcg eraApcg13    geocentric      ICRS <-> GCRS
**       eraApci eraApci13    terrestrial     ICRS <-> CIRS
**       eraApco eraApco13    terrestrial     ICRS <-> observed
**       eraApcs eraApcs13    space           ICRS <-> GCRS
**       eraAper eraAper13    terrestrial     update Earth rotation
**       eraApio eraApio13    terrestrial     CIRS <-> observed
**
**      Those with names ending in "13" use contemporary ERFA models to
**      compute the various ephemerides.  The others accept ephemerides
**      supplied by the caller.
**
**      The transformation from ICRS to GCRS covers space motion,
**      parallax, light deflection, and aberration.  From GCRS to CIRS
**      comprises frame bias and precession-nutation.  From CIRS to
**      observed takes account of Earth rotation, polar motion, diurnal
**      aberration and parallax (unless subsumed into the ICRS <-> GCRS
**      transformation), and atmospheric refraction.
**
**  11) The context structure astrom produced by this function is used
**      by eraAtioq, eraAtoiq, eraAtciq* and eraAticq*.
**
**  Called:
**     eraUtctai    UTC to TAI
**     eraTaitt     TAI to TT
**     eraUtcut1    UTC to UT1
**     eraEpv00     Earth position and velocity
**     eraPnm06a    classical NPB matrix, IAU 2006/2000A
**     eraBpn2xy    extract CIP X,Y coordinates from NPB matrix
**     eraS06       the CIO locator s, given X,Y, IAU 2006
**     eraEra00     Earth rotation angle, IAU 2000
**     eraSp00      the TIO locator s', IERS 2000
**     eraRefco     refraction constants for given ambient conditions
**     eraApco      astrometry parameters, ICRS-observed
**     eraEors      equation of the origins, given NPB matrix and s
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var astrom = {pmt:0,eb:eraZp(),eh:eraZp(),em:0,v:eraZp(),bm1:0,bpn:eraZr(),along:0,xpl:0,ypl:0,sphi:0,cphi:0,diurab:0,eral:0,refa:0,refb:0};;
   var eo = 0.0;;
   if (typeof astrom == 'undefined') {
      astrom = {pmt:0,eb:eraZp(),eh:eraZp(),em:0,v:eraZp(),bm1:0,bpn:eraZr(),along:0,xpl:0,ypl:0,sphi:0,cphi:0,diurab:0,eral:0,refa:0,refb:0};
   }   var _rv1, _rv2, _rv3, _rv4, _rv6, _rv10;

   var j;
   var tai1, tai2, tt1, tt2, ut11, ut12, ehpv = [[], []], ebpv = [[], []], r = [[], [], []], x, y, s, theta, sp, refa, refb;


/* UTC to other time scales. */
   j = ~~((_rv1 = eraUtctai(utc1, utc2))[0]);
   tai1 = _rv1[1];
   tai2 = _rv1[2];
   if ( j < 0 ) return [ -1, astrom, eo ];
   j = ~~((_rv2 = eraTaitt(tai1, tai2))[0]);
   tt1 = _rv2[1];
   tt2 = _rv2[2];
   j = ~~((_rv3 = eraUtcut1(utc1, utc2, dut1))[0]);
   ut11 = _rv3[1];
   ut12 = _rv3[2];
   if ( j < 0 ) return [ -1, astrom, eo ];

/* Earth barycentric & heliocentric position/velocity (au, au/d). */
   (_rv4 = eraEpv00(tt1, tt2))[0];
   ehpv = _rv4[1];
   ebpv = _rv4[2];

/* Form the equinox based BPN matrix, IAU 2006/2000A. */
   r = eraPnm06a(tt1, tt2);

/* Extract CIP X,Y. */
   (_rv6 = eraBpn2xy(r))[0];
   x = _rv6[0];
   y = _rv6[1];

/* Obtain CIO locator s. */
   s = eraS06(tt1, tt2, x, y);

/* Earth rotation angle. */
   theta = eraEra00(ut11, ut12);

/* TIO locator s'. */
   sp = eraSp00(tt1, tt2);

/* Refraction constants A and B. */
   (_rv10 = eraRefco(phpa, tc, rh, wl))[0];
   refa = _rv10[0];
   refb = _rv10[1];

/* Compute the star-independent astrometry parameters. */
   astrom = eraApco(tt1, tt2, ebpv, ehpv[0], x, y, s, theta, elong, phi, hm, xp, yp, sp, refa, refb);

/* Equation of the origins. */
   eo = eraEors(r, s);

/* Return any warning status. */
   return [ j, astrom, eo ];

/* Finished. */

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
