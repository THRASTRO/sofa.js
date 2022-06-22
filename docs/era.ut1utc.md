# eraUt1utc

```js
[rv, utc1, utc2] = ERFA.ut1utc(ut11, ut12, dut1)
```

Time scale transformation:  Universal Time, UT1, to Coordinated
Universal Time, UTC.

## Given:
```
   ut11,ut12  double   UT1 as a 2-part Julian Date (Note 1)
   dut1       double   Delta UT1: UT1-UTC in seconds (Note 2)
```

## Returned:
```
   utc1,utc2  double   UTC as a 2-part quasi Julian Date (Notes 3,4)
```

## Returned (function value):
```
              int      status: +1 = dubious year (Note 5)
                                0 = OK
                               -1 = unacceptable date
```

## Notes:

1) ut11+ut12 is Julian Date, apportioned in any convenient way
   between the two arguments, for example where ut11 is the Julian
   Day Number and ut12 is the fraction of a day.  The returned utc1
   and utc2 form an analogous pair, except that a special convention
   is used, to deal with the problem of leap seconds - see Note 3.

2) Delta UT1 can be obtained from tabulations provided by the
   International Earth Rotation and Reference Systems Service.  The
   value changes abruptly by 1s at a leap second;  however, close to
   a leap second the algorithm used here is tolerant of the "wrong"
   choice of value being made.

3) JD cannot unambiguously represent UTC during a leap second unless
   special measures are taken.  The convention in the present
   function is that the returned quasi-JD UTC1+UTC2 represents UTC
   days whether the length is 86399, 86400 or 86401 SI seconds.

4) The function [eraD2dtf][1] can be used to transform the UTC quasi-JD
   into calendar date and clock time, including UTC leap second
   handling.

5) The warning status "dubious year" flags UTCs that predate the
   introduction of the time scale or that are too far in the future
   to be trusted.  See [eraDat][2] for further details.

## Called:
```
   eraJd2cal    JD to Gregorian calendar
   eraDat       delta(AT) = TAI-UTC
   eraCal2jd    Gregorian calendar to JD
```

## References:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992)

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.d2dtf.md
[2]: era.dat.md
