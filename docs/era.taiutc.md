# eraTaiutc

```js
[rv, utc1, utc2] = ERFA.taiutc(tai1, tai2)
```

Time scale transformation:  International Atomic Time, TAI, to
Coordinated Universal Time, UTC.

## Given:
```
   tai1,tai2  double   TAI as a 2-part Julian Date (Note 1)
```

## Returned:
```
   utc1,utc2  double   UTC as a 2-part quasi Julian Date (Notes 1-3)
```

## Returned (function value):
```
              int      status: +1 = dubious year (Note 4)
                                0 = OK
                               -1 = unacceptable date
```

## Notes:

1) tai1+tai2 is Julian Date, apportioned in any convenient way
   between the two arguments, for example where tai1 is the Julian
   Day Number and tai2 is the fraction of a day.  The returned utc1
   and utc2 form an analogous pair, except that a special convention
   is used, to deal with the problem of leap seconds - see the next
   note.

2) JD cannot unambiguously represent UTC during a leap second unless
   special measures are taken.  The convention in the present
   function is that the JD day represents UTC days whether the
   length is 86399, 86400 or 86401 SI seconds.  In the 1960-1972 era
   there were smaller jumps (in either direction) each time the
   linear UTC(TAI) expression was changed, and these "mini-leaps"
   are also included in the ERFA convention.

3) The function [eraD2dtf][1] can be used to transform the UTC quasi-JD
   into calendar date and clock time, including UTC leap second
   handling.

4) The warning status "dubious year" flags UTCs that predate the
   introduction of the time scale or that are too far in the future
   to be trusted.  See [eraDat][2] for further details.

## Called:
```
   eraUtctai    UTC to TAI
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
