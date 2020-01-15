# eraPv2s

```js
[theta, phi, r, td, pd, rd] = ERFA.pv2s(pv)
```

Convert position/velocity from Cartesian to spherical coordinates.

## Given:
```
   pv       double[2][3]  pv-vector
```

## Returned:
```
   theta    double        longitude angle (radians)
   phi      double        latitude angle (radians)
   r        double        radial distance
   td       double        rate of change of theta
   pd       double        rate of change of phi
   rd       double        rate of change of r
```

## Notes:

1) If the position part of pv is null, theta, phi, td and pd
   are indeterminate.  This is handled by extrapolating the
   position through unit time by using the velocity part of
   pv.  This moves the origin without changing the direction
   of the velocity component.  If the position and velocity
   components of pv are both null, zeroes are returned for all
   six results.

2) If the position is a pole, theta, td and pd are indeterminate.
   In such cases zeroes are returned for all three.

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
