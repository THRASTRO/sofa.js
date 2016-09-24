function iauFk5hz(r5, d5, date1, date2)
/*
**  - - - - - - - - -
**   i a u F k 5 h z
**  - - - - - - - - -
**
**  Transform an FK5 (J2000.0) star position into the system of the
**  Hipparcos catalogue, assuming zero Hipparcos proper motion.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards Of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     r5           double   FK5 RA (radians), equinox J2000.0, at date
**     d5           double   FK5 Dec (radians), equinox J2000.0, at date
**     date1,date2  double   TDB date (Notes 1,2)
**
**  Returned:
**     rh           double   Hipparcos RA (radians)
**     dh           double   Hipparcos Dec (radians)
**
**  Notes:
**
**  1) This function converts a star position from the FK5 system to
**     the Hipparcos system, in such a way that the Hipparcos proper
**     motion is zero.  Because such a star has, in general, a non-zero
**     proper motion in the FK5 system, the function requires the date
**     at which the position in the FK5 system was determined.
**
**  2) The TT date date1+date2 is a Julian Date, apportioned in any
**     convenient way between the two arguments.  For example,
**     JD(TT)=2450123.7 could be expressed in any of these ways,
**     among others:
**
**            date1          date2
**
**         2450123.7           0.0       (JD method)
**         2451545.0       -1421.3       (J2000 method)
**         2400000.5       50123.2       (MJD method)
**         2450123.5           0.2       (date & time method)
**
**     The JD method is the most natural and convenient to use in
**     cases where the loss of several decimal digits of resolution
**     is acceptable.  The J2000 method is best matched to the way
**     the argument is handled internally and will deliver the
**     optimum resolution.  The MJD method and the date & time methods
**     are both good compromises between resolution and convenience.
**
**  3) The FK5 to Hipparcos transformation is modeled as a pure
**     rotation and spin;  zonal errors in the FK5 catalogue are not
**     taken into account.
**
**  4) The position returned by this function is in the Hipparcos
**     reference system but at date date1+date2.
**
**  5) See also iauFk52h, iauH2fk5, iauHfk5z.
**
**  Called:
**     iauS2c       spherical coordinates to unit vector
**     iauFk5hip    FK5 to Hipparcos rotation and spin
**     iauSxp       multiply p-vector by scalar
**     iauRv2m      r-vector to r-matrix
**     iauTrxp      product of transpose of r-matrix and p-vector
**     iauPxp       vector product of two p-vectors
**     iauC2s       p-vector to spherical
**     iauAnp       normalize angle into range 0 to 2pi
**
**  Reference:
**
**     F.Mignard & M.Froeschle, 2000, Astron.Astrophys. 354, 732-739.
**
**  This revision:  2013 June 18
**
**  SOFA release 2016-05-03
**
**  Copyright (C) 2016 IAU SOFA Board.  See notes at end.
*/
{
   var rh = 0.0;;
   var dh = 0.0;;
   var _rv7;

   var t, p5e = [], r5h = [[], [], []], s5h = [], vst = [], rst = [[], [], []], p5 = [], ph = [], w;


/* Interval from given date to fundamental epoch J2000.0 (JY). */
   t = - ((date1 - DJ00) + date2) / DJY;

/* FK5 barycentric position vector. */
   p5e = iauS2c(r5, d5);

/* FK5 to Hipparcos orientation matrix and spin vector. */
   s5h = iauFk5hip(r5h);

/* Accumulated Hipparcos wrt FK5 spin over that interval. */
   vst = iauSxp(t, s5h);

/* Express the accumulated spin as a rotation matrix. */
   rst = iauRv2m(vst, rst);

/* Derotate the vector's FK5 axes back to date. */
   p5 = iauTrxp(rst, p5e);

/* Rotate the vector into the Hipparcos system. */
   ph = iauRxp(r5h, p5);

/* Hipparcos vector to spherical. */
   (_rv7 = iauC2s(ph))[0];
   w = _rv7[0];
   dh = _rv7[1];
   rh = iauAnp(w);

   return [rh, dh];

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
