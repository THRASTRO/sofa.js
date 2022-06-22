# eraEform

```js
[rv, a, f] = ERFA.eform( n)
```

Earth reference ellipsoids.

## Given:
```
   n    int         ellipsoid identifier (Note 1)
```

## Returned:
```
   a    double      equatorial radius (meters, Note 2)
   f    double      flattening (Note 2)
```

## Returned (function value):
```
        int         status:  0 = OK
                            -1 = illegal identifier (Note 3)
```

## Notes:

1) The identifier n is a number that specifies the choice of
   reference ellipsoid.  The following are supported:

```
      n    ellipsoid

      1     ERFA_WGS84
      2     ERFA_GRS80
      3     ERFA_WGS72
```

   The n value has no significance outside the ERFA software.  For
   convenience, symbols ERFA_WGS84 etc. are defined in erfam.h.

2) The ellipsoid parameters are returned in the form of equatorial
   radius in meters (a) and flattening (f).  The latter is a number
   around 0.00335, i.e. around 1/298.

3) For the case where an unsupported n value is supplied, zero a and
   f are returned, as well as error status.

## References:

   Department of Defense World Geodetic System 1984, National
   Imagery and Mapping Agency Technical Report 8350.2, Third
   Edition, p3-2.

   Moritz, H., Bull. Geodesique 66-2, 187 (1992).

   The Department of Defense World Geodetic System 1972, World
   Geodetic System Committee, May 1974.

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992),
   p220.

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
