function eraLtpequ(epj)
/*
**  - - - - - - - - - -
**   e r a L t p e q u
**  - - - - - - - - - -
**
**  Long-term precession of the equator.
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
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
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
   w = ERFA_D2PI * t;
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
   x *= ERFA_DAS2R;
   y *= ERFA_DAS2R;

/* Form the equator pole vector. */
   veq[0] = x;
   veq[1] = y;
   w = 1.0 - x*x - y*y;
   veq[2] = w < 0.0 ? 0.0 : Math.sqrt(w);

/* Finished. */

return veq;
}