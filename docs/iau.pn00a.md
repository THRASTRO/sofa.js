# iauPn00a

```js
[dpsi, deps, epsa, rb, rp, rbp, rn, rbpn] = IAU.pn00a(date1, date2)
```

Precession-nutation, IAU 2000A model:  a multi-purpose function,
supporting classical (equinox-based) use directly and CIO-based
use indirectly.

## Given:
```
   date1,date2  double          TT as a 2-part Julian Date (Note 1)
```

## Returned:
```
   dpsi,deps    double          nutation (Note 2)
   epsa         double          mean obliquity (Note 3)
   rb           double[3][3]    frame bias matrix (Note 4)
   rp           double[3][3]    precession matrix (Note 5)
   rbp          double[3][3]    bias-precession matrix (Note 6)
   rn           double[3][3]    nutation matrix (Note 7)
   rbpn         double[3][3]    GCRS-to-true matrix (Notes 8,9)
```

## Notes:

1)  The TT date date1+date2 is a Julian Date, apportioned in any
    convenient way between the two arguments.  For example,
    JD(TT)=2450123.7 could be expressed in any of these ways,
    among others:

```
           date1          date2

        2450123.7           0.0       (JD method)
        2451545.0       -1421.3       (J2000 method)
        2400000.5       50123.2       (MJD method)
        2450123.5           0.2       (date & time method)

    The JD method is the most natural and convenient to use in
    cases where the loss of several decimal digits of resolution
    is acceptable.  The J2000 method is best matched to the way
    the argument is handled internally and will deliver the
    optimum resolution.  The MJD method and the date & time methods
    are both good compromises between resolution and convenience.
```

2)  The nutation components (luni-solar + planetary, IAU 2000A) in
    longitude and obliquity are in radians and with respect to the
    equinox and ecliptic of date.  Free core nutation is omitted;
    for the utmost accuracy, use the iauPn00  function, where the
    nutation components are caller-specified.  For faster but
    slightly less accurate results, use the iauPn00b function.

3)  The mean obliquity is consistent with the IAU 2000 precession.

4)  The matrix rb transforms vectors from GCRS to J2000.0 mean
    equator and equinox by applying frame bias.

5)  The matrix rp transforms vectors from J2000.0 mean equator and
    equinox to mean equator and equinox of date by applying
    precession.

6)  The matrix rbp transforms vectors from GCRS to mean equator and
    equinox of date by applying frame bias then precession.  It is
    the product rp x rb.

7)  The matrix rn transforms vectors from mean equator and equinox
    of date to true equator and equinox of date by applying the
    nutation (luni-solar + planetary).

8)  The matrix rbpn transforms vectors from GCRS to true equator and
    equinox of date.  It is the product rn x rbp, applying frame
    bias, precession and nutation in that order.

9)  The X,Y,Z coordinates of the IAU 2000A Celestial Intermediate
    Pole are elements (3,1-3) of the GCRS-to-true matrix,
    i.e. rbpn[2][0-2].

10) It is permissible to re-use the same array in the returned
    arguments.  The arrays are filled in the order given.

## Called:
```
   iauNut00a    nutation, IAU 2000A
   iauPn00      bias/precession/nutation results, IAU 2000
```

## Reference:

   Capitaine, N., Chapront, J., Lambert, S. and Wallace, P.,
   "Expressions for the Celestial Intermediate Pole and Celestial
   Ephemeris Origin consistent with the IAU 2000A precession-
   nutation model", Astron.Astrophys. 400, 1145-1154 (2003)

   n.b. The celestial ephemeris origin (CEO) was renamed "celestial
        intermediate origin" (CIO) by IAU 2006 Resolution 2.

This revision:  2013 November 14

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.