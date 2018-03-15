# iauNut80

```js
[dpsi, deps] = IAU.nut80(date1, date2)
```

Nutation, IAU 1980 model.

## Given:
```
   date1,date2   double    TT as a 2-part Julian Date (Note 1)
```

## Returned:
```
   dpsi          double    nutation in longitude (radians)
   deps          double    nutation in obliquity (radians)
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

2) The nutation components are with respect to the ecliptic of
   date.

## Called:
```
   iauAnpm      normalize angle into range +/- pi
```

## Reference:

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992),
   Section 3.222 (p111).

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.