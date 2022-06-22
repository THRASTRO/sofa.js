function eraPn00a(date1, date2)
/*
**  - - - - - - - - -
**   e r a P n 0 0 a
**  - - - - - - - - -
**
**  Precession-nutation, IAU 2000A model:  a multi-purpose function,
**  supporting classical (equinox-based) use directly and CIO-based
**  use indirectly.
**
**  Given:
**     date1,date2  double          TT as a 2-part Julian Date (Note 1)
**
**  Returned:
**     dpsi,deps    double          nutation (Note 2)
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
**  2)  The nutation components (luni-solar + planetary, IAU 2000A) in
**      longitude and obliquity are in radians and with respect to the
**      equinox and ecliptic of date.  Free core nutation is omitted;
**      for the utmost accuracy, use the eraPn00 function, where the
**      nutation components are caller-specified.  For faster but
**      slightly less accurate results, use the eraPn00b function.
**
**  3)  The mean obliquity is consistent with the IAU 2000 precession.
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
**  9)  The X,Y,Z coordinates of the IAU 2000A Celestial Intermediate
**      Pole are elements (3,1-3) of the GCRS-to-true matrix,
**      i.e. rbpn[2][0-2].
**
**  10) It is permissible to re-use the same array in the returned
**      arguments.  The arrays are filled in the stated order.
**
**  Called:
**     eraNut00a    nutation, IAU 2000A
**     eraPn00      bias/precession/nutation results, IAU 2000
**
**  Reference:
**
**     Capitaine, N., Chapront, J., Lambert, S. and Wallace, P.,
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
   var dpsi = 0.0;;
   var deps = 0.0;;
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
   }   var _rv1, _rv2;

/* Nutation. */
   (_rv1 = eraNut00a(date1, date2))[0];
   dpsi = _rv1[0];
   deps = _rv1[1];

/* Remaining results. */
   (_rv2 = eraPn00(date1, date2, dpsi, deps))[0];
   epsa = _rv2[0];
   rb = _rv2[1];
   rp = _rv2[2];
   rbp = _rv2[3];
   rn = _rv2[4];
   rbpn = _rv2[5];

/* Finished. */

return [dpsi, deps, epsa, rb, rp, rbp, rn, rbpn];
}