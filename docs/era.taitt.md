# eraTaitt

```js
[rv, tt1, tt2] = ERFA.taitt(tai1, tai2)
```

Time scale transformation:  International Atomic Time, TAI, to
Terrestrial Time, TT.

## Given:
```
   tai1,tai2  double    TAI as a 2-part Julian Date
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
   tai1+tai2 is Julian Date, apportioned in any convenient way
   between the two arguments, for example where tai1 is the Julian
   Day Number and tai2 is the fraction of a day.  The returned
   tt1,tt2 follow suit.
```

## References:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992)

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
