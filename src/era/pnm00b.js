function eraPnm00b(date1, date2)
/*
**  - - - - - - - - - -
**   e r a P n m 0 0 b
**  - - - - - - - - - -
**
**  Form the matrix of precession-nutation for a given date (including
**  frame bias), equinox-based, IAU 2000B model.
**
**  Given:
**     date1,date2 double       TT as a 2-part Julian Date (Note 1)
**
**  Returned:
**     rbpn        double[3][3] bias-precession-nutation matrix (Note 2)
**
**  Notes:
**
**  1) The TT date date1+date2 is a Julian Date, apportioned in any
**     convenient way between the two arguments.  For example,
**     JD(TT)=2450123.7 could be expressed in any of these ways, among
**     others:
**
**            date1          date2
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
**  2) The matrix operates in the sense V(date) = rbpn * V(GCRS), where
**     the p-vector V(date) is with respect to the true equatorial triad
**     of date date1+date2 and the p-vector V(GCRS) is with respect to
**     the Geocentric Celestial Reference System (IAU, 2000).
**
**  3) The present function is faster, but slightly less accurate (about
**     1 mas), than the eraPnm00a function.
**
**  Called:
**     eraPn00b     bias/precession/nutation, IAU 2000B
**
**  Reference:
**
**     IAU: Trans. International Astronomical Union, Vol. XXIVB;  Proc.
**     24th General Assembly, Manchester, UK.  Resolutions B1.3, B1.6.
**     (2000)
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var rbpn = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof rbpn == 'undefined') {
      rbpn = [ [0,0,0], [0,0,0], [0,0,0] ];
   }   var _rv1;

   var dpsi, deps, epsa, rb = [[], [], []], rp = [[], [], []], rbp = [[], [], []], rn = [[], [], []];


/* Obtain the required matrix (discarding other results). */
   (_rv1 = eraPn00b(date1, date2))[0];
   dpsi = _rv1[0];
   deps = _rv1[1];
   epsa = _rv1[2];
   rb = _rv1[3];
   rp = _rv1[4];
   rbp = _rv1[5];
   rn = _rv1[6];
   rbpn = _rv1[7];

/* Finished. */

return rbpn;
}