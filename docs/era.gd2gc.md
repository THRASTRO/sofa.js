# eraGd2gc

```js
[rv, xyz] = ERFA.gd2gc( n, elong, phi, height)
```

Transform geodetic coordinates to geocentric using the specified
reference ellipsoid.

## Given:
```
   n       int        ellipsoid identifier (Note 1)
   elong   double     longitude (radians, east +ve)
   phi     double     latitude (geodetic, radians, Note 3)
   height  double     height above ellipsoid (geodetic, Notes 2,3)
```

## Returned:
```
   xyz     double[3]  geocentric vector (Note 2)
```

## Returned (function value):
```
           int        status:  0 = OK
                              -1 = illegal identifier (Note 3)
                              -2 = illegal case (Note 3)
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

2) The height (height, given) and the geocentric vector (xyz,
   returned) are in meters.

3) No validation is performed on the arguments elong, phi and
   height.  An error status -1 means that the identifier n is
   illegal.  An error status -2 protects against cases that would
   lead to arithmetic exceptions.  In all error cases, xyz is set
   to zeros.

4) The inverse transformation is performed in the function [eraGc2gd][1].

## Called:
```
   eraEform     Earth reference ellipsoids
   eraGd2gce    geodetic to geocentric transformation, general
   eraZp        zero p-vector
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.gc2gd.md
