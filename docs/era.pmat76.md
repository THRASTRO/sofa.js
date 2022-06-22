# eraPmat76

```js
rmatp = ERFA.pmat76(date1, date2)
```

Precession matrix from J2000.0 to a specified date, IAU 1976 model.

## Given:
```
   date1,date2 double       ending date, TT (Note 1)
```

## Returned:
```
   rmatp       double[3][3] precession matrix, J2000.0 -> date1+date2
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

2) The matrix operates in the sense V(date) = RMATP * V(J2000),
   where the p-vector V(J2000) is with respect to the mean
   equatorial triad of epoch J2000.0 and the p-vector V(date)
   is with respect to the mean equatorial triad of the given
   date.

3) Though the matrix method itself is rigorous, the precession
   angles are expressed through canonical polynomials which are
   valid only for a limited time span.  In addition, the IAU 1976
   precession rate is known to be imperfect.  The absolute accuracy
   of the present formulation is better than 0.1 arcsec from
   1960AD to 2040AD, better than 1 arcsec from 1640AD to 2360AD,
   and remains below 3 arcsec for the whole of the period
   500BC to 3000AD.  The errors exceed 10 arcsec outside the
   range 1200BC to 3900AD, exceed 100 arcsec outside 4200BC to
   5600AD and exceed 1000 arcsec outside 6800BC to 8200AD.

## Called:
```
   eraPrec76    accumulated precession angles, IAU 1976
   eraIr        initialize r-matrix to identity
   eraRz        rotate around Z-axis
   eraRy        rotate around Y-axis
   eraCr        copy r-matrix
```

## References:

   Lieske, J.H., 1979, Astron.Astrophys. 73, 282.
    equations (6) & (7), p283.

   Kaplan,G.H., 1981. USNO circular no. 163, pA2.

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
