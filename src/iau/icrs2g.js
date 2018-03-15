function iauIcrs2g( dr, dd)
/*
**  - - - - - - - - - -
**   i a u I c r s 2 g
**  - - - - - - - - - -
**
**  Transformation from ICRS to Galactic Coordinates.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     dr     double      ICRS right ascension (radians)
**     dd     double      ICRS declination (radians)
**
**  Returned:
**     dl     double      galactic longitude (radians)
**     db     double      galactic latitude (radians)
**
**  Notes:
**
**  1) The IAU 1958 system of Galactic coordinates was defined with
**     respect to the now obsolete reference system FK4 B1950.0.  When
**     interpreting the system in a modern context, several factors have
**     to be taken into account:
**
**     . The inclusion in FK4 positions of the E-terms of aberration.
**
**     . The distortion of the FK4 proper motion system by differential
**       Galactic rotation.
**
**     . The use of the B1950.0 equinox rather than the now-standard
**       J2000.0.
**
**     . The frame bias between ICRS and the J2000.0 mean place system.
**
**     The Hipparcos Catalogue (Perryman & ESA 1997) provides a rotation
**     matrix that transforms directly between ICRS and Galactic
**     coordinates with the above factors taken into account.  The
**     matrix is derived from three angles, namely the ICRS coordinates
**     of the Galactic pole and the longitude of the ascending node of
**     the galactic equator on the ICRS equator.  They are given in
**     degrees to five decimal places and for canonical purposes are
**     regarded as exact.  In the Hipparcos Catalogue the matrix
**     elements are given to 10 decimal places (about 20 microarcsec).
**     In the present SOFA function the matrix elements have been
**     recomputed from the canonical three angles and are given to 30
**     decimal places.
**
**  2) The inverse transformation is performed by the function iauG2icrs.
**
**  Called:
**     iauAnp       normalize angle into range 0 to 2pi
**     iauAnpm      normalize angle into range +/- pi
**     iauS2c       spherical coordinates to unit vector
**     iauRxp       product of r-matrix and p-vector
**     iauC2s       p-vector to spherical
**
**  Reference:
**     Perryman M.A.C. & ESA, 1997, ESA SP-1200, The Hipparcos and Tycho
**     catalogues.  Astrometric and photometric star catalogues
**     derived from the ESA Hipparcos Space Astrometry Mission.  ESA
**     Publications Division, Noordwijk, Netherlands.
**
**  This revision:   2018 January 2
**
**  SOFA release 2018-01-30
**
**  Copyright (C) 2018 IAU SOFA Board.  See notes at end.
*/
{
   var dl = 0.0;;
   var db = 0.0;;
   var _rv3;

   var v1 = [], v2 = [];

/*
**  L2,B2 system of galactic coordinates in the form presented in the
**  Hipparcos Catalogue.  In degrees:
**
**  P = 192.85948    right ascension of the Galactic north pole in ICRS
**  Q =  27.12825    declination of the Galactic north pole in ICRS
**  R =  32.93192    longitude of the ascending node of the Galactic
**                   plane on the ICRS equator
**
**  ICRS to galactic rotation matrix, obtained by computing
**  R_3(-R) R_1(pi/2-Q) R_3(pi/2+P) to the full precision shown:
*/
   var                 r = [ [ -0.054875560416215368492398900454,
                        -0.873437090234885048760383168409,
                        -0.483835015548713226831774175116 ],
                      [ +0.494109427875583673525222371358,
                        -0.444829629960011178146614061616,
                        +0.746982244497218890527388004556 ],
                      [ -0.867666149019004701181616534570,
                        -0.198076373431201528180486091412,
                        +0.455983776175066922272100478348 ] ];


/* Spherical to Cartesian. */
   v1 = iauS2c(dr, dd);

/* ICRS to Galactic. */
   v2 = iauRxp(r, v1);

/* Cartesian to spherical. */
   (_rv3 = iauC2s(v2))[0];
   dl = _rv3[0];
   db = _rv3[1];

/* Express in conventional ranges. */
   dl = iauAnp(dl);
   db = iauAnpm(db);

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

return [dl, db ];
}