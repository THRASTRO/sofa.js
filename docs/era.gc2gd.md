# eraGc2gd

```js
[rv, elong, phi, height] = ERFA.gc2gd( n, xyz)
```

Transform geocentric coordinates to geodetic using the specified
reference ellipsoid.

## Given:
```
   n       int        ellipsoid identifier (Note 1)
   xyz     double[3]  geocentric vector (Note 2)
```

## Returned:
```
   elong   double     longitude (radians, east +ve, Note 3)
   phi     double     latitude (geodetic, radians, Note 3)
   height  double     height above ellipsoid (geodetic, Notes 2,3)
```

## Returned (function value):
```
          int         status:  0 = OK
                              -1 = illegal identifier (Note 3)
                              -2 = internal error (Note 3)
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

2) The geocentric vector (xyz, given) and height (height, returned)
   are in meters.

3) An error status -1 means that the identifier n is illegal.  An
   error status -2 is theoretically impossible.  In all error cases,
   all three results are set to -1e9.

4) The inverse transformation is performed in the function [eraGd2gc][1].

## Called:
```
   eraEform     Earth reference ellipsoids
   eraGc2gde    geocentric to geodetic transformation, general
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.gd2gc.md
