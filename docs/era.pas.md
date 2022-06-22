# eraPas

```js
rv = ERFA.pas(al, ap, bl, bp)
```

Position-angle from spherical coordinates.

## Given:
```
   al     double     longitude of point A (e.g. RA) in radians
   ap     double     latitude of point A (e.g. Dec) in radians
   bl     double     longitude of point B
   bp     double     latitude of point B
```

## Returned (function value):
```
          double     position angle of B with respect to A
```

## Notes:

1) The result is the bearing (position angle), in radians, of point
   B with respect to point A.  It is in the range -pi to +pi.  The
   sense is such that if B is a small distance "east" of point A,
   the bearing is approximately +pi/2.

2) Zero is returned if the two points are coincident.

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
