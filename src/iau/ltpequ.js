function iauLtpequ(epj)
/*
**  - - - - - - - - - -
**   i a u L t p e q u
**  - - - - - - - - - -
**
**  Long-term precession of the equator.
**
**  This function is part of the International Astronomical Union's
**  SOFA (Standards of Fundamental Astronomy) software collection.
**
**  Status:  support function.
**
**  Given:
**     epj     double         Julian epoch (TT)
**
**  Returned:
**     veq     double[3]      equator pole unit vector
**
**  Notes:
**
**  1) The returned vector is with respect to the J2000.0 mean equator
**     and equinox.
**
**  2) The Vondrak et al. (2011, 2012) 400 millennia precession model
**     agrees with the IAU 2006 precession at J2000.0 and stays within
**     100 microarcseconds during the 20th and 21st centuries.  It is
**     accurate to a few arcseconds throughout the historical period,
**     worsening to a few tenths of a degree at the end of the
**     +/- 200,000 year time span.
**
**  References:
**
**    Vondrak, J., Capitaine, N. and Wallace, P., 2011, New precession
**    expressions, valid for long time intervals, Astron.Astrophys. 534,
**    A22
**
**    Vondrak, J., Capitaine, N. and Wallace, P., 2012, New precession
**    expressions, valid for long time intervals (Corrigendum),
**    Astron.Astrophys. 541, C1
**
**  This revision:  2016 February 9
**
**  SOFA release 2016-05-03
**
**  Copyright (C) 2016 IAU SOFA Board.  See notes at end.
*/
{
   var veq = [0, 0, 0];;


/* Polynomial coefficients */
   var NPOL = 4;
   var                 xypol = [
      [  5453.282155,
            0.4252841,
           -0.00037173,
           -0.000000152],
      [-73750.930350,
           -0.7675452,
           -0.00018725,
            0.000000231]
   ];

/* Periodic coefficients */
   var                 xyper = [
      [ 256.75, -819.940624,75004.344875,81491.287984, 1558.515853],
      [ 708.15,-8444.676815,  624.033993,  787.163481, 7774.939698],
      [ 274.20, 2600.009459, 1251.136893, 1251.296102,-2219.534038],
      [ 241.45, 2755.175630,-1102.212834,-1257.950837,-2523.969396],
      [2309.00, -167.659835,-2660.664980,-2966.799730,  247.850422],
      [ 492.20,  871.855056,  699.291817,  639.744522, -846.485643],
      [ 396.10,   44.769698,  153.167220,  131.600209,-1393.124055],
      [ 288.90, -512.313065, -950.865637, -445.040117,  368.526116],
      [ 231.10, -819.415595,  499.754645,  584.522874,  749.045012],
      [1610.00, -538.071099, -145.188210,  -89.756563,  444.704518],
      [ 620.00, -189.793622,  558.116553,  524.429630,  235.934465],
      [ 157.87, -402.922932,  -23.923029,  -13.549067,  374.049623],
      [ 220.30,  179.516345, -165.405086, -210.157124, -171.330180],
      [1200.00,   -9.814756,    9.344131,  -44.919798,  -22.899655]
   ];
   var NPER = xyper.length;

/* Miscellaneous */
   var i;
   var t, x, y, w, a, s, c;


/* Centuries since J2000. */
   t  = ( epj - 2000.0 ) / 100.0;

/* Initialize X and Y accumulators. */
   x = 0.0;
   y = 0.0;

/* Periodic terms. */
   w = D2PI * t;
   for ( i = 0; i < NPER; i++ ) {
      a = w / xyper[i][0];
      s = Math.sin(a);
      c = Math.cos(a);
      x += c*xyper[i][1] + s*xyper[i][3];
      y += c*xyper[i][2] + s*xyper[i][4];
   }

/* Polynomial terms. */
   w = 1.0;
   for ( i = 0; i < NPOL; i++ ) {
      x += xypol[0][i]*w;
      y += xypol[1][i]*w;
      w *= t;
   }

/* X and Y (direction cosines). */
   x *= DAS2R;
   y *= DAS2R;

/* Form the equator pole vector. */
   veq[0] = x;
   veq[1] = y;
   w = 1.0 - x*x - y*y;
   veq[2] = w < 0.0 ? 0.0 : Math.sqrt(w);

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

return veq;
}