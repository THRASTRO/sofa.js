# iauGd2gce

```js
[rv, xyz] = IAU.gd2gce( a, f, elong, phi, height)
```

Transform geodetic coordinates to geocentric for a reference
ellipsoid of specified form.
SOFA (Standards of Fundamental Astronomy) software collection.


## Given:
```
   a       double     equatorial radius (Notes 1,4)
   f       double     flattening (Notes 2,4)
   elong   double     longitude (radians, east +ve)
   phi     double     latitude (geodetic, radians, Note 4)
   height  double     height above ellipsoid (geodetic, Notes 3,4)
```

## Returned:
```
   xyz     double[3]  geocentric vector (Note 3)
```

## Returned (function value):
```
           int        status:  0 = OK
                              -1 = illegal case (Note 4)
```
## Notes:

1) The equatorial radius, a, can be in any units, but meters is
   the conventional choice.

2) The flattening, f, is (for the Earth) a value around 0.00335,
   i.e. around 1/298.

3) The equatorial radius, a, and the height, height, must be
   given in the same units, and determine the units of the
   returned geocentric vector, xyz.

4) No validation is performed on individual arguments.  The error
   status -1 protects against (unrealistic) cases that would lead
   to arithmetic exceptions.  If an error occurs, xyz is unchanged.

5) The inverse transformation is performed in the function
   iauGc2gde.

6) The transformation for a standard ellipsoid (such as WGS84) can
   more conveniently be performed by calling iauGd2gc,  which uses a
   numerical code to identify the required a and f values.

## References:

   Green, R.M., Spherical Astronomy, Cambridge University Press,
   (1985) Section 4.5, p96.

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992),
   Section 4.22, p202.

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.