function iauPmpx(rc, dc, pr, pd, px, rv, pmt, pob)
/*
**  - - - - - - - -
**   i a u P m p x
**  - - - - - - - -
**
**  Proper motion and parallax.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     rc,dc  double     ICRS RA,Dec at catalog epoch (radians)
**     pr     double     RA proper motion (radians/year; Note 1)
**     pd     double     Dec proper motion (radians/year)
**     px     double     parallax (arcsec)
**     rv     double     radial velocity (km/s, +ve if receding)
**     pmt    double     proper motion time interval (SSB, Julian years)
**     pob    double[3]  SSB to observer vector (au)
**
**  Returned:
**     pco    double[3]  coordinate direction (BCRS unit vector)
**
**  Notes:
**
**  1) The proper motion in RA is dRA/dt rather than cos(Dec)*dRA/dt.
**
**  2) The proper motion time interval is for when the starlight
**     reaches the solar system barycenter.
**
**  3) To avoid the need for iteration, the Roemer effect (i.e. the
**     small annual modulation of the proper motion coming from the
**     changing light time) is applied approximately, using the
**     direction of the star at the catalog epoch.
**
**  References:
**
**     1984 Astronomical Almanac, pp B39-B41.
**
**     Urban, S. & Seidelmann, P. K. (eds), Explanatory Supplement to
**     the Astronomical Almanac, 3rd ed., University Science Books
**     (2013), Section 7.2.
**
**  Called:
**     iauPdp       scalar product of two p-vectors
**     iauPn        decompose p-vector into modulus and direction
**
**  This revision:   2013 October 9
**
**  SOFA release 2018-01-30
**
**  Copyright (C) 2018 IAU SOFA Board.  See notes at end.
*/
{
   var pco = [0, 0, 0];;
   var _rv2;

/* Km/s to au/year */
   var VF = DAYSEC*DJM/DAU;

/* Light time for 1 au, Julian years */
   var AULTY = AULT/DAYSEC/DJY;

   var i;
   var sr, cr, sd, cd, x, y, z, p = [], dt, pxr, w, pdz, pm = [];


/* Spherical coordinates to unit vector (and useful functions). */
   sr = Math.sin(rc);
   cr = Math.cos(rc);
   sd = Math.sin(dc);
   cd = Math.cos(dc);
   p[0] = x = cr*cd;
   p[1] = y = sr*cd;
   p[2] = z = sd;

/* Proper motion time interval (y) including Roemer effect. */
   dt = pmt + iauPdp(p, pob)*AULTY;

/* Space motion (radians per year). */
   pxr = px * DAS2R;
   w = VF * rv * pxr;
   pdz = pd * z;
   pm[0] = - pr*y - pdz*cr + w*x;
   pm[1] =   pr*x - pdz*sr + w*y;
   pm[2] =   pd*cd + w*z;

/* Coordinate direction of star (unit vector, BCRS). */
   for (i = 0; i < 3; i++) {
      p[i] += dt*pm[i] - pxr*pob[i];
   }
   (_rv2 = iauPn(p))[0];
   w = _rv2[0];
   pco = _rv2[1];

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

return pco;
}