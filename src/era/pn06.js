function eraPn06(date1, date2, dpsi, deps)
/*
**  - - - - - - - -
**   e r a P n 0 6
**  - - - - - - - -
**
**  Precession-nutation, IAU 2006 model:  a multi-purpose function,
**  supporting classical (equinox-based) use directly and CIO-based use
**  indirectly.
**
**  Given:
**     date1,date2  double          TT as a 2-part Julian Date (Note 1)
**     dpsi,deps    double          nutation (Note 2)
**
**  Returned:
**     epsa         double          mean obliquity (Note 3)
**     rb           double[3][3]    frame bias matrix (Note 4)
**     rp           double[3][3]    precession matrix (Note 5)
**     rbp          double[3][3]    bias-precession matrix (Note 6)
**     rn           double[3][3]    nutation matrix (Note 7)
**     rbpn         double[3][3]    GCRS-to-true matrix (Notes 8,9)
**
**  Notes:
**
**  1)  The TT date date1+date2 is a Julian Date, apportioned in any
**      convenient way between the two arguments.  For example,
**      JD(TT)=2450123.7 could be expressed in any of these ways,
**      among others:
**
**             date1          date2
**
**          2450123.7           0.0       (JD method)
**          2451545.0       -1421.3       (J2000 method)
**          2400000.5       50123.2       (MJD method)
**          2450123.5           0.2       (date & time method)
**
**      The JD method is the most natural and convenient to use in
**      cases where the loss of several decimal digits of resolution
**      is acceptable.  The J2000 method is best matched to the way
**      the argument is handled internally and will deliver the
**      optimum resolution.  The MJD method and the date & time methods
**      are both good compromises between resolution and convenience.
**
**  2)  The caller is responsible for providing the nutation components;
**      they are in longitude and obliquity, in radians and are with
**      respect to the equinox and ecliptic of date.  For high-accuracy
**      applications, free core nutation should be included as well as
**      any other relevant corrections to the position of the CIP.
**
**  3)  The returned mean obliquity is consistent with the IAU 2006
**      precession.
**
**  4)  The matrix rb transforms vectors from GCRS to J2000.0 mean
**      equator and equinox by applying frame bias.
**
**  5)  The matrix rp transforms vectors from J2000.0 mean equator and
**      equinox to mean equator and equinox of date by applying
**      precession.
**
**  6)  The matrix rbp transforms vectors from GCRS to mean equator and
**      equinox of date by applying frame bias then precession.  It is
**      the product rp x rb.
**
**  7)  The matrix rn transforms vectors from mean equator and equinox
**      of date to true equator and equinox of date by applying the
**      nutation (luni-solar + planetary).
**
**  8)  The matrix rbpn transforms vectors from GCRS to true equator and
**      equinox of date.  It is the product rn x rbp, applying frame
**      bias, precession and nutation in that order.
**
**  9)  The X,Y,Z coordinates of the Celestial Intermediate Pole are
**      elements (3,1-3) of the GCRS-to-true matrix, i.e. rbpn[2][0-2].
**
**  10) It is permissible to re-use the same array in the returned
**      arguments.  The arrays are filled in the stated order.
**
**  Called:
**     eraPfw06     bias-precession F-W angles, IAU 2006
**     eraFw2m      F-W angles to r-matrix
**     eraCr        copy r-matrix
**     eraTr        transpose r-matrix
**     eraRxr       product of two r-matrices
**
**  References:
**
**     Capitaine, N. & Wallace, P.T., 2006, Astron.Astrophys. 450, 855
**
**     Wallace, P.T. & Capitaine, N., 2006, Astron.Astrophys. 459, 981
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var epsa = 0.0;;
   var rb = [ [0,0,0], [0,0,0], [0,0,0] ];;
   var rp = [ [0,0,0], [0,0,0], [0,0,0] ];;
   var rbp = [ [0,0,0], [0,0,0], [0,0,0] ];;
   var rn = [ [0,0,0], [0,0,0], [0,0,0] ];;
   var rbpn = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof rb == 'undefined') {
      rb = 0.0;
   }   if (typeof rp == 'undefined') {
      rp = 0.0;
   }   if (typeof rbp == 'undefined') {
      rbp = 0.0;
   }   if (typeof rn == 'undefined') {
      rn = 0.0;
   }   if (typeof rbpn == 'undefined') {
      rbpn = 0.0;
   }   var _rv1, _rv4;

   var gamb, phib, psib, eps, r1 = [[], [], []], r2 = [[], [], []], rt = [[], [], []];


/* Bias-precession Fukushima-Williams angles of J2000.0 = frame bias. */
   (_rv1 = eraPfw06(ERFA_DJM0, ERFA_DJM00))[0];
   gamb = _rv1[0];
   phib = _rv1[1];
   psib = _rv1[2];
   eps = _rv1[3];

/* B matrix. */
   r1 = eraFw2m(gamb, phib, psib, eps);
   rb = eraCr(r1);

/* Bias-precession Fukushima-Williams angles of date. */
   (_rv4 = eraPfw06(date1, date2))[0];
   gamb = _rv4[0];
   phib = _rv4[1];
   psib = _rv4[2];
   eps = _rv4[3];

/* Bias-precession matrix. */
   r2 = eraFw2m(gamb, phib, psib, eps);
   rbp = eraCr(r2);

/* Solve for precession matrix. */
   rt = eraTr(r1);
   rp = eraRxr(r2, rt);

/* Equinox-based bias-precession-nutation matrix. */
   r1 = eraFw2m(gamb, phib, psib + dpsi, eps + deps);
   rbpn = eraCr(r1);

/* Solve for nutation matrix. */
   rt = eraTr(r2);
   rn = eraRxr(r1, rt);

/* Obliquity, mean of date. */
   epsa = eps;

/* Finished. */

return [epsa, rb, rp, rbp, rn, rbpn];
}