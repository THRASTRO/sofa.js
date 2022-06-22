# eraTttcg

```js
[rv, tcg1, tcg2] = ERFA.tttcg(tt1, tt2)
```

Time scale transformation:  Terrestrial Time, TT, to Geocentric
Coordinate Time, TCG.

## Given:
```
   tt1,tt2    double    TT as a 2-part Julian Date
```

## Returned:
```
   tcg1,tcg2  double    TCG as a 2-part Julian Date
```

## Returned (function value):
```
              int       status:  0 = OK
```

## Note:

```
   tt1+tt2 is Julian Date, apportioned in any convenient way between
   the two arguments, for example where tt1 is the Julian Day Number
   and tt2 is the fraction of a day.  The returned tcg1,tcg2 follow
   suit.
```

## References:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

   IAU 2000 Resolution B1.9

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
