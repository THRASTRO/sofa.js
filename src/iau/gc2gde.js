function iauGc2gde( a, f, xyz)
/*
**  - - - - - - - - - -
**   i a u G c 2 g d e
**  - - - - - - - - - -
**
**  Transform geocentric coordinates to geodetic for a reference
**  ellipsoid of specified form.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     a       double     equatorial radius (Notes 2,4)
**     f       double     flattening (Note 3)
**     xyz     double[3]  geocentric vector (Note 4)
**
**  Returned:
**     elong   double     longitude (radians, east +ve)
**     phi     double     latitude (geodetic, radians)
**     height  double     height above ellipsoid (geodetic, Note 4)
**
**  Returned (function value):
**             int        status:  0 = OK
**                                -1 = illegal f
**                                -2 = illegal a
**
**  Notes:
**
**  1) This function is based on the GCONV2H Fortran subroutine by
**     Toshio Fukushima (see reference).
**
**  2) The equatorial radius, a, can be in any units, but meters is
**     the conventional choice.
**
**  3) The flattening, f, is (for the Earth) a value around 0.00335,
**     i.e. around 1/298.
**
**  4) The equatorial radius, a, and the geocentric vector, xyz,
**     must be given in the same units, and determine the units of
**     the returned height, height.
**
**  5) If an error occurs (status < 0), elong, phi and height are
**     unchanged.
**
**  6) The inverse transformation is performed in the function
**     iauGd2gce.
**
**  7) The transformation for a standard ellipsoid (such as WGS84) can
**     more conveniently be performed by calling iauGc2gd, which uses a
**     numerical code to identify the required A and F values.
**
**  Reference:
**
**     Fukushima, T., "Transformation from Cartesian to geodetic
**     coordinates accelerated by Halley's method", J.Geodesy (2006)
**     79: 689-693
**
**  This revision:  2014 November 7
**
**  SOFA release 2018-01-30
**
**  Copyright (C) 2018 IAU SOFA Board.  See notes at end.
*/
{
   var elong = 0.0;;
   var phi = 0.0;;
   var height = 0.0;;


   var aeps2, e2, e4t, ec2, ec, b, x, y, z, p2, absz, p, s0, pn, zc, c0, c02, c03, s02, s03, a02, a0, a03, d0, f0, b0, s1, cc, s12, cc2;


/* ------------- */
/* Preliminaries */
/* ------------- */

/* Validate ellipsoid parameters. */
   if ( f < 0.0 || f >= 1.0 ) return [ -1, elong, phi, height  ];
   if ( a <= 0.0 ) return [ -2, elong, phi, height  ];

/* Functions of ellipsoid parameters (with further validation of f). */
   aeps2 = a*a * 1e-32;
   e2 = (2.0 - f) * f;
   e4t = e2*e2 * 1.5;
   ec2 = 1.0 - e2;
   if ( ec2 <= 0.0 ) return [ -1, elong, phi, height  ];
   ec = Math.sqrt(ec2);
   b = a * ec;

/* Cartesian components. */
   x = xyz[0];
   y = xyz[1];
   z = xyz[2];

/* Distance from polar axis squared. */
   p2 = x*x + y*y;

/* Longitude. */
   elong = p2 > 0.0 ? Math.atan2(y, x) : 0.0;

/* Unsigned z-coordinate. */
   absz = Math.abs(z);

/* Proceed unless polar case. */
   if ( p2 > aeps2 ) {

   /* Distance from polar axis. */
      p = Math.sqrt(p2);

   /* Normalization. */
      s0 = absz / a;
      pn = p / a;
      zc = ec * s0;

   /* Prepare Newton correction factors. */
      c0 = ec * pn;
      c02 = c0 * c0;
      c03 = c02 * c0;
      s02 = s0 * s0;
      s03 = s02 * s0;
      a02 = c02 + s02;
      a0 = Math.sqrt(a02);
      a03 = a02 * a0;
      d0 = zc*a03 + e2*s03;
      f0 = pn*a03 - e2*c03;

   /* Prepare Halley correction factor. */
      b0 = e4t * s02 * c02 * pn * (a0 - ec);
      s1 = d0*f0 - b0*s0;
      cc = ec * (f0*f0 - b0*c0);

   /* Evaluate latitude and height. */
      phi = Math.atan(s1/cc);
      s12 = s1 * s1;
      cc2 = cc * cc;
      height = (p*cc + absz*s1 - a * Math.sqrt(ec2*s12 + cc2)) /
                                                        Math.sqrt(s12 + cc2);
   } else {

   /* Exception: pole. */
      phi = DPI / 2.0;
      height = absz - b;
   }

/* Restore sign of latitude. */
   if ( z < 0 ) phi = -phi;

/* OK status. */
   return [ 0, elong, phi, height  ];

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
