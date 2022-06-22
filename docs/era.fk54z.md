# eraFk54z

```js
[r1950, d1950, dr1950, dd1950] = ERFA.fk54z(r2000, d2000, bepoch)
```

Convert a J2000.0 FK5 star position to B1950.0 FK4, assuming zero
proper motion in FK5 and parallax.

## Given:
```
   r2000,d2000    double   J2000.0 FK5 RA,Dec (rad)
   bepoch         double   Besselian epoch (e.g. 1950.0)
```

## Returned:
```
   r1950,d1950    double   B1950.0 FK4 RA,Dec (rad) at epoch BEPOCH
   dr1950,dd1950  double   B1950.0 FK4 proper motions (rad/trop.yr)
```

## Notes:

1) In contrast to the [eraFk524][1] function, here the FK5 proper
   motions, the parallax and the radial velocity are presumed zero.

2) This function converts a star position from the IAU 1976 FK5
  (Fricke) system to the former FK4 (Bessel-Newcomb) system, for
   cases such as distant radio sources where it is presumed there is
   zero parallax and no proper motion.  Because of the E-terms of
   aberration, such objects have (in general) non-zero proper motion
   in FK4, and the present function returns those fictitious proper
   motions.

3) Conversion from B1950.0 FK4 to J2000.0 FK5 only is provided for.
   Conversions involving other equinoxes would require additional
   treatment for precession.

4) The position returned by this function is in the B1950.0 FK4
   reference system but at Besselian epoch BEPOCH.  For comparison
   with catalogs the BEPOCH argument will frequently be 1950.0. (In
   this context the distinction between Besselian and Julian epoch
   is insignificant.)

5) The RA component of the returned (fictitious) proper motion is
   dRA/dt rather than cos(Dec)*dRA/dt.

## Called:
```
   eraAnp       normalize angle into range 0 to 2pi
   eraC2s       p-vector to spherical
   eraFk524     FK4 to FK5
   eraS2c       spherical to p-vector
```

This revision:   2020 November 19

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.fk524.md
