function eraAtciq(rc, dc, pr, pd, px, rv, astrom)
/*
**  - - - - - - - - -
**   e r a A t c i q
**  - - - - - - - - -
**
**  Quick ICRS, epoch J2000.0, to CIRS transformation, given precomputed
**  star-independent astrometry parameters.
**
**  Use of this function is appropriate when efficiency is important and
**  where many star positions are to be transformed for one date.  The
**  star-independent parameters can be obtained by calling one of the
**  functions eraApci[13], eraApcg[13], eraApco[13] or eraApcs[13].
**
**  If the parallax and proper motions are zero the eraAtciqz function
**  can be used instead.
**
**  Given:
**     rc,dc  double     ICRS RA,Dec at J2000.0 (radians)
**     pr     double     RA proper motion (radians/year; Note 3)
**     pd     double     Dec proper motion (radians/year)
**     px     double     parallax (arcsec)
**     rv     double     radial velocity (km/s, +ve if receding)
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
**     ri,di   double    CIRS RA,Dec (radians)
**
**  Notes:
**
**  1) All the vectors are with respect to BCRS axes.
**
**  2) Star data for an epoch other than J2000.0 (for example from the
**     Hipparcos catalog, which has an epoch of J1991.25) will require a
**     preliminary call to eraPmsafe before use.
**
**  3) The proper motion in RA is dRA/dt rather than cos(Dec)*dRA/dt.
**
**  Called:
**     eraPmpx      proper motion and parallax
**     eraLdsun     light deflection by the Sun
**     eraAb        stellar aberration
**     eraRxp       product of r-matrix and pv-vector
**     eraC2s       p-vector to spherical
**     eraAnp       normalize angle into range 0 to 2pi
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var ri = 0.0;;
   var di = 0.0;;
   var _rv5;

   var pco = [], pnat = [], ppr = [], pi = [], w;


/* Proper motion and parallax, giving BCRS coordinate direction. */
   pco = eraPmpx(rc, dc, pr, pd, px, rv, astrom.pmt, astrom.eb);

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