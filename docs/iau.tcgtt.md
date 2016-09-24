# iauTcgtt

```js
[rv, tt1, tt2] = IAU.tcgtt(tcg1, tcg2)
```

Time scale transformation:  Geocentric Coordinate Time, TCG, to
Terrestrial Time, TT.
SOFA (Standards of Fundamental Astronomy) software collection.


## Given:
```
   tcg1,tcg2  double    TCG as a 2-part Julian Date
```

## Returned:
```
   tt1,tt2    double    TT as a 2-part Julian Date
```

## Returned (function value):
```
              int       status:  0 = OK
```

## Note:

```
   tcg1+tcg2 is Julian Date, apportioned in any convenient way
   between the two arguments, for example where tcg1 is the Julian
   Day Number and tcg22 is the fraction of a day.  The returned
   tt1,tt2 follow suit.
```

## References:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),.
   IERS Technical Note No. 32, BKG (2004)

   IAU 2000 Resolution B1.9

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.