# iauS00

```js
rv = IAU.s00(date1, date2, x, y)
```

The CIO locator s, positioning the Celestial Intermediate Origin on
the equator of the Celestial Intermediate Pole, given the CIP's X,Y
coordinates.  Compatible with IAU 2000A precession-nutation.

## Given:
```
   date1,date2   double    TT as a 2-part Julian Date (Note 1)
   x,y           double    CIP coordinates (Note 3)
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
   of the same point in two systems:  the two systems are the GCRS
   and the CIP,CIO, and the point is the ascending node of the
   CIP equator.  The quantity s remains below 0.1 arcsecond
   throughout 1900-2100.

3) The series used to compute s is in fact for s+XY/2, where X and Y
   are the x and y components of the CIP unit vector;  this series
   is more compact than a direct series for s would be.  This
   function requires X,Y to be supplied by the caller, who is
   responsible for providing values that are consistent with the
   supplied date.

4) The model is consistent with the IAU 2000A precession-nutation.

## Called:
```
   iauFal03     mean anomaly of the Moon
   iauFalp03    mean anomaly of the Sun
   iauFaf03     mean argument of the latitude of the Moon
   iauFad03     mean elongation of the Moon from the Sun
   iauFaom03    mean longitude of the Moon's ascending node
   iauFave03    mean longitude of Venus
   iauFae03     mean longitude of Earth
   iauFapa03    general accumulated precession in longitude
```

## References:

   Capitaine, N., Chapront, J., Lambert, S. and Wallace, P.,
   "Expressions for the Celestial Intermediate Pole and Celestial
   Ephemeris Origin consistent with the IAU 2000A precession-
   nutation model", Astron.Astrophys. 400, 1145-1154 (2003)

   n.b. The celestial ephemeris origin (CEO) was renamed "celestial
        intermediate origin" (CIO) by IAU 2006 Resolution 2.

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.