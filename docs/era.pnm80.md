# eraPnm80

```js
rmatpn = ERFA.pnm80(date1, date2)
```

Form the matrix of precession/nutation for a given date, IAU 1976
precession model, IAU 1980 nutation model.

## Given:
```
   date1,date2 double       TT as a 2-part Julian Date (Note 1)
```

## Returned:
```
   rmatpn         double[3][3]   combined precession/nutation matrix
```

## Notes:

1) The TT date date1+date2 is a Julian Date, apportioned in any
   convenient way between the two arguments.  For example,
   JD(TT)=2450123.7 could be expressed in any of these ways,
   among others:

```
          date1          date2

       2450123.7           0.0       (JD method)
       2451545.0       -1421.3       (J2000 method)
       2400000.5       50123.2       (MJD method)
       2450123.5           0.2       (date & time method)
```

   The JD method is the most natural and convenient to use in
   cases where the loss of several decimal digits of resolution
   is acceptable.  The J2000 method is best matched to the way
   the argument is handled internally and will deliver the
   optimum resolution.  The MJD method and the date & time methods
   are both good compromises between resolution and convenience.

2) The matrix operates in the sense V(date) = rmatpn * V(J2000),
   where the p-vector V(date) is with respect to the true equatorial
   triad of date date1+date2 and the p-vector V(J2000) is with
   respect to the mean equatorial triad of epoch J2000.0.

## Called:
```
   eraPmat76    precession matrix, IAU 1976
   eraNutm80    nutation matrix, IAU 1980
   eraRxr       product of two r-matrices
```

## Reference:

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992),
   Section 3.3 (p145).

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
