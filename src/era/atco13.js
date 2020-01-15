function eraAtco13(rc, dc, pr, pd, px, rv, utc1, utc2, dut1, elong, phi, hm, xp, yp, phpa, tc, rh, wl)
/*
**  - - - - - - - - - -
**   e r a A t c o 1 3
**  - - - - - - - - - -
**
**  ICRS RA,Dec to observed place.  The caller supplies UTC, site
**  coordinates, ambient air conditions and observing wavelength.
**
**  ERFA models are used for the Earth ephemeris, bias-precession-
**  nutation, Earth orientation and refraction.
**
**  Given:
**     rc,dc  double   ICRS right ascension at J2000.0 (radians, Note 1)
**     pr     double   RA proper motion (radians/year; Note 2)
**     pd     double   Dec proper motion (radians/year)
**     px     double   parallax (arcsec)
**     rv     double   radial velocity (km/s, +ve if receding)
**     utc1   double   UTC as a 2-part...
**     utc2   double   ...quasi Julian Date (Notes 3-4)
**     dut1   double   UT1-UTC (seconds, Note 5)
**     elong  double   longitude (radians, east +ve, Note 6)
**     phi    double   latitude (geodetic, radians, Note 6)
**     hm     double   height above ellipsoid (m, geodetic, Notes 6,8)
**     xp,yp  double   polar motion coordinates (radians, Note 7)
**     phpa   double   pressure at the observer (hPa = mB, Note 8)
**     tc     double   ambient temperature at the observer (deg C)
**     rh     double   relative humidity at the observer (range 0-1)
**     wl     double   wavelength (micrometers, Note 9)
**
**  Returned:
**     aob    double*  observed azimuth (radians: N=0,E=90)
**     zob    double*  observed zenith distance (radians)
**     hob    double*  observed hour angle (radians)
**     dob    double*  observed declination (radians)
**     rob    double*  observed right ascension (CIO-based, radians)
**     eo     double*  equation of the origins (ERA-GST)
**
**  Returned (function value):
**            int      status: +1 = dubious year (Note 4)
**                              0 = OK
**                             -1 = unacceptable date
**
**  Notes:
**
**  1)  Star data for an epoch other than J2000.0 (for example from the
**      Hipparcos catalog, which has an epoch of J1991.25) will require
**      a preliminary call to eraPmsafe before use.
**
**  2)  The proper motion in RA is dRA/dt rather than cos(Dec)*dRA/dt.
**
**  3)  utc1+utc2 is quasi Julian Date (see Note 2), apportioned in any
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
**  4)  The warning status "dubious year" flags UTCs that predate the
**      introduction of the time scale or that are too far in the
**      future to be trusted.  See eraDat for further details.
**
**  5)  UT1-UTC is tabulated in IERS bulletins.  It increases by exactly
**      one second at the end of each positive UTC leap second,
**      introduced in order to keep UT1-UTC within +/- 0.9s.  n.b. This
**      practice is under review, and in the future UT1-UTC may grow
**      essentially without limit.
**
**  6)  The geographical coordinates are with respect to the ERFA_WGS84
**      reference ellipsoid.  TAKE CARE WITH THE LONGITUDE SIGN:  the
**      longitude required by the present function is east-positive
**      (i.e. right-handed), in accordance with geographical convention.
**
**  7)  The polar motion xp,yp can be obtained from IERS bulletins.  The
**      values are the coordinates (in radians) of the Celestial
**      Intermediate Pole with respect to the International Terrestrial
**      Reference System (see IERS Conventions 2003), measured along the
**      meridians 0 and 90 deg west respectively.  For many
**      applications, xp and yp can be set to zero.
**
**  8)  If hm, the height above the ellipsoid of the observing station
**      in meters, is not known but phpa, the pressure in hPa (=mB),
**      is available, an adequate estimate of hm can be obtained from
**      the expression
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
**  9)  The argument wl specifies the observing wavelength in
**      micrometers.  The transition from optical to radio is assumed to
**      occur at 100 micrometers (about 3000 GHz).
**
**  10) The accuracy of the result is limited by the corrections for
**      refraction, which use a simple A*tan(z) + B*tan^3(z) model.
**      Providing the meteorological parameters are known accurately and
**      there are no gross local effects, the predicted observed
**      coordinates should be within 0.05 arcsec (optical) or 1 arcsec
**      (radio) for a zenith distance of less than 70 degrees, better
**      than 30 arcsec (optical or radio) at 85 degrees and better
**      than 20 arcmin (optical) or 30 arcmin (radio) at the horizon.
**
**      Without refraction, the complementary functions eraAtco13 and
**      eraAtoc13 are self-consistent to better than 1 microarcsecond
**      all over the celestial sphere.  With refraction included,
**      consistency falls off at high zenith distances, but is still
**      better than 0.05 arcsec at 85 degrees.
**
**  11) "Observed" Az,ZD means the position that would be seen by a
**      perfect geodetically aligned theodolite.  (Zenith distance is
**      used rather than altitude in order to reflect the fact that no
**      allowance is made for depression of the horizon.)  This is
**      related to the observed HA,Dec via the standard rotation, using
**      the geodetic latitude (corrected for polar motion), while the
**      observed HA and RA are related simply through the Earth rotation
**      angle and the site longitude.  "Observed" RA,Dec or HA,Dec thus
**      means the position that would be seen by a perfect equatorial
**      with its polar axis aligned to the Earth's axis of rotation.
**
**  12) It is advisable to take great care with units, as even unlikely
**      values of the input parameters are accepted and processed in
**      accordance with the models used.
**
**  Called:
**     eraApco13    astrometry parameters, ICRS-observed, 2013
**     eraAtciq     quick ICRS to CIRS
**     eraAtioq     quick CIRS to observed
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var aob = 0.0;;
   var zob = 0.0;;
   var hob = 0.0;;
   var dob = 0.0;;
   var rob = 0.0;;
   var eo = 0.0;;
   var _rv1, _rv2, _rv3;

   var j;
   var astrom = {pmt:0,eb:eraZp(),eh:eraZp(),em:0,v:eraZp(),bm1:0,bpn:eraZr(),along:0,xpl:0,ypl:0,sphi:0,cphi:0,diurab:0,eral:0,refa:0,refb:0};
   var ri, di;


/* Star-independent astrometry parameters. */
   j = ~~((_rv1 = eraApco13(utc1, utc2, dut1, elong, phi, hm, xp, yp, phpa, tc, rh, wl))[0]);
   astrom = _rv1[1];
   eo = _rv1[2];

/* Abort if bad UTC. */
   if ( j < 0 ) return [ j, aob, zob, hob, dob, rob, eo ];

/* Transform ICRS to CIRS. */
   (_rv2 = eraAtciq(rc, dc, pr, pd, px, rv, astrom))[0];
   ri = _rv2[0];
   di = _rv2[1];

/* Transform CIRS to observed. */
   (_rv3 = eraAtioq(ri, di, astrom))[0];
   aob = _rv3[0];
   zob = _rv3[1];
   hob = _rv3[2];
   dob = _rv3[3];
   rob = _rv3[4];

/* Return OK/warning status. */
   return [ j, aob, zob, hob, dob, rob, eo ];

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
