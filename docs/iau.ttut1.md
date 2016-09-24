# iauTtut1

```js
[rv, ut11, ut12] = IAU.ttut1(tt1, tt2, dt)
```

Time scale transformation:  Terrestrial Time, TT, to Universal Time,
UT1.
SOFA (Standards of Fundamental Astronomy) software collection.


## Given:
```
   tt1,tt2    double    TT as a 2-part Julian Date
   dt         double    TT-UT1 in seconds
```

## Returned:
```
   ut11,ut12  double    UT1 as a 2-part Julian Date
```

## Returned (function value):
```
              int       status:  0 = OK
```

## Notes:

1) tt1+tt2 is Julian Date, apportioned in any convenient way between
   the two arguments, for example where tt1 is the Julian Day Number
   and tt2 is the fraction of a day.  The returned ut11,ut12 follow
   suit.

2) The argument dt is classical Delta T.

## Reference:

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992)

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.