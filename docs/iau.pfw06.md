# iauPfw06

```js
[gamb, phib, psib, epsa] = IAU.pfw06(date1, date2)
```

Precession angles, IAU 2006 (Fukushima-Williams 4-angle formulation).

## Given:
```
   date1,date2  double   TT as a 2-part Julian Date (Note 1)
```

## Returned:
```
   gamb         double   F-W angle gamma_bar (radians)
   phib         double   F-W angle phi_bar (radians)
   psib         double   F-W angle psi_bar (radians)
   epsa         double   F-W angle epsilon_A (radians)
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

## 2) Naming the following points:

```
         e = J2000.0 ecliptic pole,
         p = GCRS pole,
         E = mean ecliptic pole of date,
   and   P = mean pole of date,
```

   the four Fukushima-Williams angles are as follows:

```
      gamb = gamma_bar = epE
      phib = phi_bar = pE
      psib = psi_bar = pEP
      epsa = epsilon_A = EP
```

3) The matrix representing the combined effects of frame bias and
   precession is:

```
      PxB = R_1(-epsa).R_3(-psib).R_1(phib).R_3(gamb)
```

4) The matrix representing the combined effects of frame bias,
   precession and nutation is simply:

```
      NxPxB = R_1(-epsa-dE).R_3(-psib-dP).R_1(phib).R_3(gamb)
```

   where dP and dE are the nutation components with respect to the
   ecliptic of date.

## Reference:

   Hilton, J. et al., 2006, Celest.Mech.Dyn.Astron. 94, 351

## Called:
```
   iauObl06     mean obliquity, IAU 2006
```

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.