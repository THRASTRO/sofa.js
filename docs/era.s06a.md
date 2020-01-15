# eraS06a

```js
rv = ERFA.s06a(date1, date2)
```

The CIO locator s, positioning the Celestial Intermediate Origin on
the equator of the Celestial Intermediate Pole, using the IAU 2006
precession and IAU 2000A nutation models.

## Given:
```
   date1,date2  double    TT as a 2-part Julian Date (Note 1)
```

## Returned (function value):
```
                double    the CIO locator s in radians (Note 2)
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

2) The CIO locator s is the difference between the right ascensions
   of the same point in two systems.  The two systems are the GCRS
   and the CIP,CIO, and the point is the ascending node of the
   CIP equator.  The CIO locator s remains a small fraction of
   1 arcsecond throughout 1900-2100.

3) The series used to compute s is in fact for s+XY/2, where X and Y
   are the x and y components of the CIP unit vector;  this series is
   more compact than a direct series for s would be.  The present
   function uses the full IAU 2000A nutation model when predicting
   the CIP position.

## Called:
```
   eraPnm06a    classical NPB matrix, IAU 2006/2000A
   eraBpn2xy    extract CIP X,Y coordinates from NPB matrix
   eraS06       the CIO locator s, given X,Y, IAU 2006
```

## References:

   Capitaine, N., Chapront, J., Lambert, S. and Wallace, P.,
   "Expressions for the Celestial Intermediate Pole and Celestial
   Ephemeris Origin consistent with the IAU 2000A precession-
   nutation model", Astron.Astrophys. 400, 1145-1154 (2003)

   n.b. The celestial ephemeris origin (CEO) was renamed "celestial
        intermediate origin" (CIO) by IAU 2006 Resolution 2.

   Capitaine, N. & Wallace, P.T., 2006, Astron.Astrophys. 450, 855

   McCarthy, D. D., Petit, G. (eds.), 2004, IERS Conventions (2003),
   IERS Technical Note No. 32, BKG

   Wallace, P.T. & Capitaine, N., 2006, Astron.Astrophys. 459, 981

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
