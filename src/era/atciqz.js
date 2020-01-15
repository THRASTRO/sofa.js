function eraAtciqz(rc, dc, astrom)
/*
**  - - - - - - - - - -
**   e r a A t c i q z
**  - - - - - - - - - -
**
**  Quick ICRS to CIRS transformation, given precomputed star-
**  independent astrometry parameters, and assuming zero parallax and
**  proper motion.
**
**  Use of this function is appropriate when efficiency is important and
**  where many star positions are to be transformed for one date.  The
**  star-independent parameters can be obtained by calling one of the
**  functions eraApci[13], eraApcg[13], eraApco[13] or eraApcs[13].
**
**  The corresponding function for the case of non-zero parallax and
**  proper motion is eraAtciq.
**
**  Given:
**     rc,dc  double     ICRS astrometric RA,Dec (radians)
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
**     ri,di  double     CIRS RA,Dec (radians)
**
**  Note:
**
**     All the vectors are with respect to BCRS axes.
**
**  References:
**
**     Urban, S. & Seidelmann, P. K. (eds), Explanatory Supplement to
**     the Astronomical Almanac, 3rd ed., University Science Books
**     (2013).
**
**     Klioner, Sergei A., "A practical relativistic model for micro-
**     arcsecond astrometry in space", Astr. J. 125, 1580-1597 (2003).
**
**  Called:
**     eraS2c       spherical coordinates to unit vector
**     eraLdsun     light deflection due to Sun
**     eraAb        stellar aberration
**     eraRxp       product of r-matrix and p-vector
**     eraC2s       p-vector to spherical
**     eraAnp       normalize angle into range +/- pi
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var ri = 0.0;;
   var di = 0.0;;
   var _rv5;

   var pco = [], pnat = [], ppr = [], pi = [], w;


/* BCRS coordinate direction (unit vector). */
   pco = eraS2c(rc, dc);

/* Light deflection by the Sun, giving BCRS natural direction. */
   pnat = eraLdsun(pco, astrom.eh, astrom.em);

/* Aberration, giving GCRS proper direction. */
   ppr = eraAb(pnat, astrom.v, astrom.em, astrom.bm1);

/* Bias-precession-nutation, giving CIRS proper direction. */
   pi = eraRxp(astrom.bpn, ppr);

/* CIRS RA,Dec. */
   (_rv5 = eraC2s(pi))[0];
   w = _rv5[0];
   di = _rv5[1];
   ri = eraAnp(w);

/* Finished. */

return [ri, di];
}