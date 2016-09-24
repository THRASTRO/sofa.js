# iauUt1tai

```js
[rv, tai1, tai2] = IAU.ut1tai(ut11, ut12, dta)
```

Time scale transformation:  Universal Time, UT1, to International
Atomic Time, TAI.
SOFA (Standards of Fundamental Astronomy) software collection.


## Given:
```
   ut11,ut12  double    UT1 as a 2-part Julian Date
   dta        double    UT1-TAI in seconds
```

## Returned:
```
   tai1,tai2  double    TAI as a 2-part Julian Date
```

## Returned (function value):
```
              int       status:  0 = OK
```

## Notes:

1) ut11+ut12 is Julian Date, apportioned in any convenient way
   between the two arguments, for example where ut11 is the Julian
   Day Number and ut12 is the fraction of a day.  The returned
   tai1,tai2 follow suit.

2) The argument dta, i.e. UT1-TAI, is an observed quantity, and is
   available from IERS tabulations.

## Reference:

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992)

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.