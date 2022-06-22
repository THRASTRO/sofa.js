function eraNutm80(date1, date2)
/*
**  - - - - - - - - - -
**   e r a N u t m 8 0
**  - - - - - - - - - -
**
**  Form the matrix of nutation for a given date, IAU 1980 model.
**
**  Given:
**     date1,date2    double          TDB date (Note 1)
**
**  Returned:
**     rmatn          double[3][3]    nutation matrix
**
**  Notes:
**
**  1) The TT date date1+date2 is a Julian Date, apportioned in any
**     convenient way between the two arguments.  For example,
**     JD(TT)=2450123.7 could be expressed in any of these ways,
**     among others:
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
**  2) The matrix operates in the sense V(true) = rmatn * V(mean),
**     where the p-vector V(true) is with respect to the true
**     equatorial triad of date and the p-vector V(mean) is with
**     respect to the mean equatorial triad of date.
**
**  Called:
**     eraNut80     nutation, IAU 1980
**     eraObl80     mean obliquity, IAU 1980
**     eraNumat     form nutation matrix
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var rmatn = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof rmatn == 'undefined') {
      rmatn = [ [0,0,0], [0,0,0], [0,0,0] ];
   }   var _rv1;

   var dpsi, deps, epsa;


/* Nutation components and mean obliquity. */
   (_rv1 = eraNut80(date1, date2))[0];
   dpsi = _rv1[0];
   deps = _rv1[1];
   epsa = eraObl80(date1, date2);

/* Build the rotation matrix. */
   rmatn = eraNumat(epsa, dpsi, deps);

/* Finished. */

return rmatn;
}