# eraPnm00a

```js
rbpn = ERFA.pnm00a(date1, date2)
```

Form the matrix of precession-nutation for a given date (including
frame bias), equinox based, IAU 2000A model.

## Given:
```
   date1,date2 double       TT as a 2-part Julian Date (Note 1)
```

## Returned:
```
   rbpn        double[3][3] bias-precession-nutation matrix (Note 2)
```

## Notes:

1) The TT date date1+date2 is a Julian Date, apportioned in any
   convenient way between the two arguments.  For example,
   JD(TT)=2450123.7 could be expressed in any of these ways, among
   others:

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

2) The matrix operates in the sense V(date) = rbpn * V(GCRS), where
   the p-vector V(date) is with respect to the true equatorial triad
   of date date1+date2 and the p-vector V(GCRS) is with respect to
   the Geocentric Celestial Reference System (IAU, 2000).

3) A faster, but slightly less accurate, result (about 1 mas) can be
   obtained by using instead the [eraPnm00b][1] function.

## Called:
```
   eraPn00a     bias/precession/nutation, IAU 2000A
```

## Reference:

   IAU: Trans. International Astronomical Union, Vol. XXIVB;  Proc.
   24th General Assembly, Manchester, UK.  Resolutions B1.3, B1.6.
   (2000)

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.pnm00b.md
