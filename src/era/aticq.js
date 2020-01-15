function eraAticq(ri, di, astrom)
/*
**  - - - - - - - - -
**   e r a A t i c q
**  - - - - - - - - -
**
**  Quick CIRS RA,Dec to ICRS astrometric place, given the star-
**  independent astrometry parameters.
**
**  Use of this function is appropriate when efficiency is important and
**  where many star positions are all to be transformed for one date.
**  The star-independent astrometry parameters can be obtained by
**  calling one of the functions eraApci[13], eraApcg[13], eraApco[13]
**  or eraApcs[13].
**
**  Given:
**     ri,di  double     CIRS RA,Dec (radians)
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
**
**  Returned:
**     rc,dc  double     ICRS astrometric RA,Dec (radians)
**
**  Notes:
**
**  1) Only the Sun is taken into account in the light deflection
**     correction.
**
**  2) Iterative techniques are used for the aberration and light
**     deflection corrections so that the functions eraAtic13 (or
**     eraAticq) and eraAtci13 (or eraAtciq) are accurate inverses;
**     even at the edge of the Sun's disk the discrepancy is only about
**     1 nanoarcsecond.
**
**  Called:
**     eraS2c       spherical coordinates to unit vector
**     eraTrxp      product of transpose of r-matrix and p-vector
**     eraZp        zero p-vector
**     eraAb        stellar aberration
**     eraLdsun     light deflection by the Sun
**     eraC2s       p-vector to spherical
**     eraAnp       normalize angle into range +/- pi
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var rc = 0.0;;
   var dc = 0.0;;
   var _rv7;

   var j, i;
   var pi = [], ppr = [], pnat = [], pco = [], w, d = [], before = [], r2, r, after = [];


/* CIRS RA,Dec to Cartesian. */
   pi = eraS2c(ri, di);

/* Bias-precession-nutation, giving GCRS proper direction. */
   ppr = eraTrxp(astrom.bpn, pi);

/* Aberration, giving GCRS natural direction. */
   d = eraZp(d);
   for (j = 0; j < 2; j++) {
      r2 = 0.0;
      for (i = 0; i < 3; i++) {
         w = ppr[i] - d[i];
         before[i] = w;
         r2 += w*w;
      }
      r = Math.sqrt(r2);
      for (i = 0; i < 3; i++) {
         before[i] /= r;
      }
      after = eraAb(before, astrom.v, astrom.em, astrom.bm1);
      r2 = 0.0;
      for (i = 0; i < 3; i++) {
         d[i] = after[i] - before[i];
         w = ppr[i] - d[i];
         pnat[i] = w;
         r2 += w*w;
      }
      r = Math.sqrt(r2);
      for (i = 0; i < 3; i++) {
         pnat[i] /= r;
      }
   }

/* Light deflection by the Sun, giving BCRS coordinate direction. */
   d = eraZp(d);
   for (j = 0; j < 5; j++) {
      r2 = 0.0;
      for (i = 0; i < 3; i++) {
         w = pnat[i] - d[i];
         before[i] = w;
         r2 += w*w;
      }
      r = Math.sqrt(r2);
      for (i = 0; i < 3; i++) {
         before[i] /= r;
      }
      after = eraLdsun(before, astrom.eh, astrom.em);
      r2 = 0.0;
      for (i = 0; i < 3; i++) {
         d[i] = after[i] - before[i];
         w = pnat[i] - d[i];
         pco[i] = w;
         r2 += w*w;
      }
      r = Math.sqrt(r2);
      for (i = 0; i < 3; i++) {
         pco[i] /= r;
      }
   }

/* ICRS astrometric RA,Dec. */
   (_rv7 = eraC2s(pco))[0];
   w = _rv7[0];
   dc = _rv7[1];
   rc = eraAnp(w);

/* Finished. */

return [rc, dc];
}