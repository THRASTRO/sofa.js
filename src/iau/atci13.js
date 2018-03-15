function iauAtci13(rc, dc, pr, pd, px, rv, date1, date2)
/*
**  - - - - - - - - - -
**   i a u A t c i 1 3
**  - - - - - - - - - -
**
**  Transform ICRS star data, epoch J2000.0, to CIRS.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     rc     double   ICRS right ascension at J2000.0 (radians, Note 1)
**     dc     double   ICRS declination at J2000.0 (radians, Note 1)
**     pr     double   RA proper motion (radians/year; Note 2)
**     pd     double   Dec proper motion (radians/year)
**     px     double   parallax (arcsec)
**     rv     double   radial velocity (km/s, +ve if receding)
**     date1  double   TDB as a 2-part...
**     date2  double   ...Julian Date (Note 3)
**
**  Returned:
**     ri,di  double*  CIRS geocentric RA,Dec (radians)
**     eo     double*  equation of the origins (ERA-GST, Note 5)
**
**  Notes:
**
**  1) Star data for an epoch other than J2000.0 (for example from the
**     Hipparcos catalog, which has an epoch of J1991.25) will require a
**     preliminary call to iauPmsafe before use.
**
**  2) The proper motion in RA is dRA/dt rather than cos(Dec)*dRA/dt.
**
**  3) The TDB date date1+date2 is a Julian Date, apportioned in any
**     convenient way between the two arguments.  For example,
**     JD(TDB)=2450123.7 could be expressed in any of these ways, among
**     others:
**
**            date1          date2
**
**         2450123.7           0.0       (JD method)
**         2451545.0       -1421.3       (J2000 method)
**         2400000.5       50123.2       (MJD method)
**         2450123.5           0.2       (date & time method)
**
**     The JD method is the most natural and convenient to use in cases
**     where the loss of several decimal digits of resolution is
**     acceptable.  The J2000 method is best matched to the way the
**     argument is handled internally and will deliver the optimum
**     resolution.  The MJD method and the date & time methods are both
**     good compromises between resolution and convenience.  For most
**     applications of this function the choice will not be at all
**     critical.
**
**     TT can be used instead of TDB without any significant impact on
**     accuracy.
**
**  4) The available accuracy is better than 1 milliarcsecond, limited
**     mainly by the precession-nutation model that is used, namely
**     IAU 2000A/2006.  Very close to solar system bodies, additional
**     errors of up to several milliarcseconds can occur because of
**     unmodeled light deflection;  however, the Sun's contribution is
**     taken into account, to first order.  The accuracy limitations of
**     the SOFA function iauEpv00 (used to compute Earth position and
**     velocity) can contribute aberration errors of up to
**     5 microarcseconds.  Light deflection at the Sun's limb is
**     uncertain at the 0.4 mas level.
**
**  5) Should the transformation to (equinox based) apparent place be
**     required rather than (CIO based) intermediate place, subtract the
**     equation of the origins from the returned right ascension:
**     RA = RI - EO. (The iauAnp function can then be applied, as
**     required, to keep the result in the conventional 0-2pi range.)
**
**  Called:
**     iauApci13    astrometry parameters, ICRS-CIRS, 2013
**     iauAtciq     quick ICRS to CIRS
**
**  This revision:   2017 March 12
**
**  SOFA release 2018-01-30
**
**  Copyright (C) 2018 IAU SOFA Board.  See notes at end.
*/
{
   var ri = 0.0;;
   var di = 0.0;;
   var eo = 0.0;;
   var _rv1, _rv2;

/* Star-independent astrometry parameters */
   var astrom = {pmt:0,eb:iauZp(),eh:iauZp(),em:0,v:iauZp(),bm1:0,bpn:iauZr(),along:0,xpl:0,ypl:0,sphi:0,cphi:0,diurab:0,eral:0,refa:0,refb:0};


/* The transformation parameters. */
   (_rv1 = iauApci13(date1, date2))[0];
   astrom = _rv1[0];
   eo = _rv1[1];

/* ICRS (epoch J2000.0) to CIRS. */
   (_rv2 = iauAtciq(rc, dc, pr, pd, px, rv, astrom))[0];
   ri = _rv2[0];
   di = _rv2[1];

/* Finished. */

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

return [ri, di, eo];
}