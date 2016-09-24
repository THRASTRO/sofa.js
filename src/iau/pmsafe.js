function iauPmsafe(ra1, dec1, pmr1, pmd1, px1, rv1, ep1a, ep1b, ep2a, ep2b)
/*
**  - - - - - - - - - -
**   i a u P m s a f e
**  - - - - - - - - - -
**
**  Star proper motion:  update star catalog data for space motion, with
**  special handling to handle the zero parallax case.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     ra1    double      right ascension (radians), before
**     dec1   double      declination (radians), before
**     pmr1   double      RA proper motion (radians/year), before
**     pmd1   double      Dec proper motion (radians/year), before
**     px1    double      parallax (arcseconds), before
**     rv1    double      radial velocity (km/s, +ve = receding), before
**     ep1a   double      "before" epoch, part A (Note 1)
**     ep1b   double      "before" epoch, part B (Note 1)
**     ep2a   double      "after" epoch, part A (Note 1)
**     ep2b   double      "after" epoch, part B (Note 1)
**
**  Returned:
**     ra2    double      right ascension (radians), after
**     dec2   double      declination (radians), after
**     pmr2   double      RA proper motion (radians/year), after
**     pmd2   double      Dec proper motion (radians/year), after
**     px2    double      parallax (arcseconds), after
**     rv2    double      radial velocity (km/s, +ve = receding), after
**
**  Returned (function value):
**            int         status:
**                         -1 = system error (should not occur)
**                          0 = no warnings or errors
**                          1 = distance overridden (Note 6)
**                          2 = excessive velocity (Note 7)
**                          4 = solution didn't converge (Note 8)
**                       else = binary logical OR of the above warnings
**
**  Notes:
**
**  1) The starting and ending TDB epochs ep1a+ep1b and ep2a+ep2b are
**     Julian Dates, apportioned in any convenient way between the two
**     parts (A and B).  For example, JD(TDB)=2450123.7 could be
**     expressed in any of these ways, among others:
**
**            epNa            epNb
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
**     good compromises between resolution and convenience.
**
**  2) In accordance with normal star-catalog conventions, the object's
**     right ascension and declination are freed from the effects of
**     secular aberration.  The frame, which is aligned to the catalog
**     equator and equinox, is Lorentzian and centered on the SSB.
**
**     The proper motions are the rate of change of the right ascension
**     and declination at the catalog epoch and are in radians per TDB
**     Julian year.
**
**     The parallax and radial velocity are in the same frame.
**
**  3) Care is needed with units.  The star coordinates are in radians
**     and the proper motions in radians per Julian year, but the
**     parallax is in arcseconds.
**
**  4) The RA proper motion is in terms of coordinate angle, not true
**     angle.  If the catalog uses arcseconds for both RA and Dec proper
**     motions, the RA proper motion will need to be divided by cos(Dec)
**     before use.
**
**  5) Straight-line motion at constant speed, in the inertial frame, is
**     assumed.
**
**  6) An extremely small (or zero or negative) parallax is overridden
**     to ensure that the object is at a finite but very large distance,
**     but not so large that the proper motion is equivalent to a large
**     but safe speed (about 0.1c using the chosen constant).  A warning
**     status of 1 is added to the status if this action has been taken.
**
**  7) If the space velocity is a significant fraction of c (see the
**     constant VMAX in the function iauStarpv), it is arbitrarily set
**     to zero.  When this action occurs, 2 is added to the status.
**
**  8) The relativistic adjustment carried out in the iauStarpv function
**     involves an iterative calculation.  If the process fails to
**     converge within a set number of iterations, 4 is added to the
**     status.
**
**  Called:
**     iauSeps      angle between two points
**     iauStarpm    update star catalog data for space motion
**
**  This revision:   2014 July 1
**
**  SOFA release 2016-05-03
**
**  Copyright (C) 2016 IAU SOFA Board.  See notes at end.
*/
{
   var ra2 = 0.0;;
   var dec2 = 0.0;;
   var pmr2 = 0.0;;
   var pmd2 = 0.0;;
   var px2 = 0.0;;
   var rv2 = 0.0;;
   var _rv2;

/* Minimum allowed parallax (arcsec) */
   var PXMIN = 5e-7;

/* Factor giving maximum allowed transverse speed of about 1% c */
   var F = 326.0;

   var jpx, j;
   var pm, px1a;


/* Proper motion in one year (radians). */
   pm = iauSeps(ra1, dec1, ra1+pmr1, dec1+pmd1);

/* Override the parallax to reduce the chances of a warning status. */
   jpx = 0;
   px1a = px1;
   pm *= F;
   if (px1a < pm) {jpx = 1; px1a = pm;}
   if (px1a < PXMIN) {jpx = 1; px1a = PXMIN;}

/* Carry out the transformation using the modified parallax. */
   j = ~~((_rv2 = iauStarpm(ra1, dec1, pmr1, pmd1, px1a, rv1, ep1a, ep1b, ep2a, ep2b))[0]);
   ra2 = _rv2[1];
   dec2 = _rv2[2];
   pmr2 = _rv2[3];
   pmd2 = _rv2[4];
   px2 = _rv2[5];
   rv2 = _rv2[6];

/* Revise and return the status. */
   if ( !(j%2) ) j += ~~(jpx);
   return [ j, ra2, dec2, pmr2, pmd2, px2, rv2 ];

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

}
