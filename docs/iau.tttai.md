# iauTttai

```js
[rv, tai1, tai2] = IAU.tttai(tt1, tt2)
```

Time scale transformation:  Terrestrial Time, TT, to International
Atomic Time, TAI.
SOFA (Standards of Fundamental Astronomy) software collection.


## Given:
```
   tt1,tt2    double    TT as a 2-part Julian Date
```

## Returned:
```
   tai1,tai2  double    TAI as a 2-part Julian Date
```

## Returned (function value):
```
              int       status:  0 = OK
```

## Note:

```
   tt1+tt2 is Julian Date, apportioned in any convenient way between
   the two arguments, for example where tt1 is the Julian Day Number
   and tt2 is the fraction of a day.  The returned tai1,tai2 follow
   suit.
```

## References:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992)

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.