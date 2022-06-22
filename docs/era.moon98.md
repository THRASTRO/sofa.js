# eraMoon98

```js
pv = ERFA.moon98( date1, date2)
```

Approximate geocentric position and velocity of the Moon.

n.b. Not IAU-endorsed and without canonical status.

## Given:
```
   date1  double         TT date part A (Notes 1,4)
   date2  double         TT date part B (Notes 1,4)
```

## Returned:
```
   pv     double[2][3]   Moon p,v, GCRS (AU, AU/d, Note 5)
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

   The JD method is the most natural and convenient to use in cases
   where the loss of several decimal digits of resolution is
   acceptable.  The J2000 method is best matched to the way the
   argument is handled internally and will deliver the optimum
   resolution.  The MJD method and the date & time methods are both
   good compromises between resolution and convenience.  The limited
   accuracy of the present algorithm is such that any of the methods
   is satisfactory.

2) This function is a full implementation of the algorithm
   published by Meeus (see reference) except that the light-time
   correction to the Moon's mean longitude has been omitted.

3) Comparisons with ELP/MPP02 over the interval 1950-2100 gave RMS
   errors of 2.9 arcsec in geocentric direction, 6.1 km in position
   and 36 mm/s in velocity.  The worst case errors were 18.3 arcsec
   in geocentric direction, 31.7 km in position and 172 mm/s in
   velocity.

4) The original algorithm is expressed in terms of "dynamical time",
   which can either be TDB or TT without any significant change in
   accuracy.  UT cannot be used without incurring significant errors
   (30 arcsec in the present era) due to the Moon's 0.5 arcsec/sec
   movement.

5) The result is with respect to the GCRS (the same as J2000.0 mean
   equator and equinox to within 23 mas).

6) Velocity is obtained by a complete analytical differentiation
   of the Meeus model.

7) The Meeus algorithm generates position and velocity in mean
   ecliptic coordinates of date, which the present function then
   rotates into GCRS.  Because the ecliptic system is precessing,
   there is a coupling between this spin (about 1.4 degrees per
   century) and the Moon position that produces a small velocity
   contribution.  In the present function this effect is neglected
   as it corresponds to a maximum difference of less than 3 mm/s and
   increases the RMS error by only 0.4%.

## References:

   Meeus, J., Astronomical Algorithms, 2nd edition, Willmann-Bell,
   1998, p337.

   Simon, J.L., Bretagnon, P., Chapront, J., Chapront-Touze, M.,
   Francou, G. & Laskar, J., Astron.Astrophys., 1994, 282, 663

Defined in erfam.h:
```
   ERFA_DAU           astronomical unit (m)
   ERFA_DJC           days per Julian century
   ERFA_DJ00          reference epoch (J2000.0), Julian Date
   ERFA_DD2R          degrees to radians
```

## Called:
```
   eraS2pv      spherical coordinates to pv-vector
   eraPfw06     bias-precession F-W angles, IAU 2006
   eraIr        initialize r-matrix to identity
   eraRz        rotate around Z-axis
   eraRx        rotate around X-axis
   eraRxpv      product of r-matrix and pv-vector
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
