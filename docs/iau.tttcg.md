# iauTttcg

```js
[rv, tcg1, tcg2] = IAU.tttcg(tt1, tt2)
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

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.