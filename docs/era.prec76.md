# eraPrec76

```js
[zeta, z, theta] = ERFA.prec76(date01, date02, date11, date12)
```

IAU 1976 precession model.

This function forms the three Euler angles which implement general
precession between two dates, using the IAU 1976 model (as for the
FK5 catalog).

## Given:
```
   date01,date02   double    TDB starting date (Note 1)
   date11,date12   double    TDB ending date (Note 1)
```

## Returned:
```
   zeta            double    1st rotation: radians cw around z
   z               double    3rd rotation: radians cw around z
   theta           double    2nd rotation: radians ccw around y
```

## Notes:

1) The dates date01+date02 and date11+date12 are Julian Dates,
   apportioned in any convenient way between the arguments daten1
   and daten2.  For example, JD(TDB)=2450123.7 could be expressed in
   any of these ways, among others:

```
         daten1        daten2

       2450123.7           0.0       (JD method)
       2451545.0       -1421.3       (J2000 method)
       2400000.5       50123.2       (MJD method)
       2450123.5           0.2       (date & time method)
```

   The JD method is the most natural and convenient to use in cases
   where the loss of several decimal digits of resolution is
   acceptable.  The J2000 method is best matched to the way the
   argument is handled internally and will deliver the optimum
   optimum resolution.  The MJD method and the date & time methods
   are both good compromises between resolution and convenience.
   The two dates may be expressed using different methods, but at
   the risk of losing some resolution.

2) The accumulated precession angles zeta, z, theta are expressed
   through canonical polynomials which are valid only for a limited
   time span.  In addition, the IAU 1976 precession rate is known to
   be imperfect.  The absolute accuracy of the present formulation
   is better than 0.1 arcsec from 1960AD to 2040AD, better than
   1 arcsec from 1640AD to 2360AD, and remains below 3 arcsec for
   the whole of the period 500BC to 3000AD.  The errors exceed
   10 arcsec outside the range 1200BC to 3900AD, exceed 100 arcsec
   outside 4200BC to 5600AD and exceed 1000 arcsec outside 6800BC to
   8200AD.

3) The three angles are returned in the conventional order, which
   is not the same as the order of the corresponding Euler
   rotations.  The precession matrix is
   R_3(-z) x R_2(+theta) x R_3(-zeta).

## Reference:

   Lieske, J.H., 1979, Astron.Astrophys. 73, 282, equations
   (6) & (7), p283.

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
