# eraGc2gde

```js
[rv, elong, phi, height] = ERFA.gc2gde( a, f, xyz)
```

Transform geocentric coordinates to geodetic for a reference
ellipsoid of specified form.

## Given:
```
   a       double     equatorial radius (Notes 2,4)
   f       double     flattening (Note 3)
   xyz     double[3]  geocentric vector (Note 4)
```

## Returned:
```
   elong   double     longitude (radians, east +ve)
   phi     double     latitude (geodetic, radians)
   height  double     height above ellipsoid (geodetic, Note 4)
```

## Returned (function value):
```
           int        status:  0 = OK
                              -1 = illegal f
                              -2 = illegal a
```

## Notes:

1) This function is based on the GCONV2H Fortran subroutine by
   Toshio Fukushima (see reference).

2) The equatorial radius, a, can be in any units, but meters is
   the conventional choice.

3) The flattening, f, is (for the Earth) a value around 0.00335,
   i.e. around 1/298.

4) The equatorial radius, a, and the geocentric vector, xyz,
   must be given in the same units, and determine the units of
   the returned height, height.

5) If an error occurs (status < 0), elong, phi and height are
   unchanged.

6) The inverse transformation is performed in the function
   [eraGd2gce][1].

7) The transformation for a standard ellipsoid (such as ERFA_WGS84) can
   more conveniently be performed by calling [eraGc2gd][2], which uses a
   numerical code to identify the required A and F values.

## Reference:

   Fukushima, T., "Transformation from Cartesian to geodetic
   coordinates accelerated by Halley's method", J.Geodesy (2006)
   79: 689-693

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.gd2gce.md
[2]: era.gc2gd.md
