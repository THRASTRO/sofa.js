function eraBp00(date1, date2)
/*
**  - - - - - - - -
**   e r a B p 0 0
**  - - - - - - - -
**
**  Frame bias and precession, IAU 2000.
**
**  Given:
**     date1,date2  double         TT as a 2-part Julian Date (Note 1)
**
**  Returned:
**     rb           double[3][3]   frame bias matrix (Note 2)
**     rp           double[3][3]   precession matrix (Note 3)
**     rbp          double[3][3]   bias-precession matrix (Note 4)
**
**  Notes:
**
**  1) The TT date date1+date2 is a Julian Date, apportioned in any
**     convenient way between the two arguments.  For example,
**     JD(TT)=2450123.7 could be expressed in any of these ways,
**     among others:
**
**             date1         date2
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
**  2) The matrix rb transforms vectors from GCRS to mean J2000.0 by
**     applying frame bias.
**
**  3) The matrix rp transforms vectors from J2000.0 mean equator and
**     equinox to mean equator and equinox of date by applying
**     precession.
**
**  4) The matrix rbp transforms vectors from GCRS to mean equator and
**     equinox of date by applying frame bias then precession.  It is
**     the product rp x rb.
**
**  5) It is permissible to re-use the same array in the returned
**     arguments.  The arrays are filled in the order given.
**
**  Called:
**     eraBi00      frame bias components, IAU 2000
**     eraPr00      IAU 2000 precession adjustments
**     eraIr        initialize r-matrix to identity
**     eraRx        rotate around X-axis
**     eraRy        rotate around Y-axis
**     eraRz        rotate around Z-axis
**     eraCr        copy r-matrix
**     eraRxr       product of two r-matrices
**
**  Reference:
**     "Expressions for the Celestial Intermediate Pole and Celestial
**     Ephemeris Origin consistent with the IAU 2000A precession-
**     nutation model", Astron.Astrophys. 400, 1145-1154 (2003)
**
**     n.b. The celestial ephemeris origin (CEO) was renamed "celestial
**          intermediate origin" (CIO) by IAU 2006 Resolution 2.
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var rb = [ [0,0,0], [0,0,0], [0,0,0] ];;
   var rp = [ [0,0,0], [0,0,0], [0,0,0] ];;
   var rbp = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof rb == 'undefined') {
      rb = [ [0,0,0], [0,0,0], [0,0,0] ];
   }   if (typeof rp == 'undefined') {
      rp = [ [0,0,0], [0,0,0], [0,0,0] ];
   }   if (typeof rbp == 'undefined') {
      rbp = [ [0,0,0], [0,0,0], [0,0,0] ];
   }   var _rv1, _rv2;

/* J2000.0 obliquity (Lieske et al. 1977) */
   var EPS0 = 84381.448 * ERFA_DAS2R;

   var t, dpsibi, depsbi, dra0, psia77, oma77, chia, dpsipr, depspr, psia, oma, rbw = [[], [], []];


/* Interval between fundamental epoch J2000.0 and current date (JC). */
   t = ((date1 - ERFA_DJ00) + date2) / ERFA_DJC;

/* Frame bias. */
   (_rv1 = eraBi00())[0];
   dpsibi = _rv1[0];
   depsbi = _rv1[1];
   dra0 = _rv1[2];

/* Precession angles (Lieske et al. 1977) */
   psia77 = (5038.7784 + (-1.07259 + (-0.001147) * t) * t) * t * ERFA_DAS2R;
   oma77  =       EPS0 + ((0.05127 + (-0.007726) * t) * t) * t * ERFA_DAS2R;
   chia   = (  10.5526 + (-2.38064 + (-0.001125) * t) * t) * t * ERFA_DAS2R;

/* Apply IAU 2000 precession corrections. */
   (_rv2 = eraPr00(date1, date2))[0];
   dpsipr = _rv2[0];
   depspr = _rv2[1];
   psia = psia77 + dpsipr;
   oma  = oma77  + depspr;

/* Frame bias matrix: GCRS to J2000.0. */
   rbw = eraIr();
   rbw = eraRz(dra0, rbw);
   rbw = eraRy(dpsibi*Math.sin(EPS0), rbw);
   rbw = eraRx(-depsbi, rbw);
   rb = eraCr(rbw);

/* Precession matrix: J2000.0 to mean of date. */
   rp = eraIr();
   rp = eraRx(EPS0, rp);
   rp = eraRz(-psia, rp);
   rp = eraRx(-oma, rp);
   rp = eraRz(chia, rp);

/* Bias-precession matrix: GCRS to mean of date. */
   rbp = eraRxr(rp, rbw);

/* Finished. */

return [rb, rp, rbp];
}