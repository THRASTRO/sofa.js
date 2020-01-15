# eraTdbtcb

```js
[rv, tcb1, tcb2] = ERFA.tdbtcb(tdb1, tdb2)
```

Time scale transformation:  Barycentric Dynamical Time, TDB, to
Barycentric Coordinate Time, TCB.

## Given:
```
   tdb1,tdb2  double    TDB as a 2-part Julian Date
```

## Returned:
```
   tcb1,tcb2  double    TCB as a 2-part Julian Date
```

## Returned (function value):
```
              int       status:  0 = OK
```

## Notes:

1) tdb1+tdb2 is Julian Date, apportioned in any convenient way
   between the two arguments, for example where tdb1 is the Julian
   Day Number and tdb2 is the fraction of a day.  The returned
   tcb1,tcb2 follow suit.

2) The 2006 IAU General Assembly introduced a conventional linear
   transformation between TDB and TCB.  This transformation
   compensates for the drift between TCB and terrestrial time TT,
   and keeps TDB approximately centered on TT.  Because the
   relationship between TT and TCB depends on the adopted solar
   system ephemeris, the degree of alignment between TDB and TT over
   long intervals will vary according to which ephemeris is used.
   Former definitions of TDB attempted to avoid this problem by
   stipulating that TDB and TT should differ only by periodic
   effects.  This is a good description of the nature of the
   relationship but eluded precise mathematical formulation.  The
   conventional linear relationship adopted in 2006 sidestepped
   these difficulties whilst delivering a TDB that in practice was
   consistent with values before that date.

3) TDB is essentially the same as Teph, the time argument for the
   JPL solar system ephemerides.

## Reference:

   IAU 2006 Resolution B3

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
