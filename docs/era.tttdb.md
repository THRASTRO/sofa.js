# eraTttdb

```js
[rv, tdb1, tdb2] = ERFA.tttdb(tt1, tt2, dtr)
```

Time scale transformation:  Terrestrial Time, TT, to Barycentric
Dynamical Time, TDB.

## Given:
```
   tt1,tt2    double    TT as a 2-part Julian Date
   dtr        double    TDB-TT in seconds
```

## Returned:
```
   tdb1,tdb2  double    TDB as a 2-part Julian Date
```

## Returned (function value):
```
              int       status:  0 = OK
```

## Notes:

1) tt1+tt2 is Julian Date, apportioned in any convenient way between
   the two arguments, for example where tt1 is the Julian Day Number
   and tt2 is the fraction of a day.  The returned tdb1,tdb2 follow
   suit.

2) The argument dtr represents the quasi-periodic component of the
   GR transformation between TT and TCB.  It is dependent upon the
   adopted solar-system ephemeris, and can be obtained by numerical
   integration, by interrogating a precomputed time ephemeris or by
   evaluating a model such as that implemented in the ERFA function
   [eraDtdb][1].   The quantity is dominated by an annual term of 1.7 ms
   amplitude.

3) TDB is essentially the same as Teph, the time argument for the JPL
   solar system ephemerides.

## References:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

   IAU 2006 Resolution 3

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.dtdb.md
