# iauGd2gc

```js
[rv, xyz] = IAU.gd2gc( n, elong, phi, height)
```

Transform geodetic coordinates to geocentric using the specified
reference ellipsoid.
SOFA (Standards of Fundamental Astronomy) software collection.


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

      1     WGS84
      2     GRS80
      3     WGS72
```

   The n value has no significance outside the SOFA software.  For
   convenience, symbols WGS84 etc. are defined in sofam.h.

2) The height (height, given) and the geocentric vector (xyz,
   returned) are in meters.

3) No validation is performed on the arguments elong, phi and
   height.  An error status -1 means that the identifier n is
   illegal.  An error status -2 protects against cases that would
   lead to arithmetic exceptions.  In all error cases, xyz is set
   to zeros.

4) The inverse transformation is performed in the function iauGc2gd.

## Called:
```
   iauEform     Earth reference ellipsoids
   iauGd2gce    geodetic to geocentric transformation, general
   iauZp        zero p-vector
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.