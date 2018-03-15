# iauUtctai

```js
[rv, tai1, tai2] = IAU.utctai(utc1, utc2)
```

Time scale transformation:  Coordinated Universal Time, UTC, to
International Atomic Time, TAI.

## Given:
```
   utc1,utc2  double   UTC as a 2-part quasi Julian Date (Notes 1-4)
```

## Returned:
```
   tai1,tai2  double   TAI as a 2-part Julian Date (Note 5)
```

## Returned (function value):
```
              int      status: +1 = dubious year (Note 3)
                                0 = OK
                               -1 = unacceptable date
```

## Notes:

1) utc1+utc2 is quasi Julian Date (see Note 2), apportioned in any
   convenient way between the two arguments, for example where utc1
   is the Julian Day Number and utc2 is the fraction of a day.

2) JD cannot unambiguously represent UTC during a leap second unless
   special measures are taken.  The convention in the present
   function is that the JD day represents UTC days whether the
   length is 86399, 86400 or 86401 SI seconds.  In the 1960-1972 era
   there were smaller jumps (in either direction) each time the
   linear UTC(TAI) expression was changed, and these "mini-leaps"
   are also included in the SOFA convention.

3) The warning status "dubious year" flags UTCs that predate the
   introduction of the time scale or that are too far in the future
   to be trusted.  See [iauDat][1] for further details.

4) The function [iauDtf2d][2] converts from calendar date and time of day
   into 2-part Julian Date, and in the case of UTC implements the
   leap-second-ambiguity convention described above.

5) The returned TAI1,TAI2 are such that their sum is the TAI Julian
   Date.

## Called:
```
   iauJd2cal    JD to Gregorian calendar
   iauDat       delta(AT) = TAI-UTC
   iauCal2jd    Gregorian calendar to JD
```

## References:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992)

This revision:  2013 July 26

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.

[1]: iau.dat.md
[2]: iau.dtf2d.md
