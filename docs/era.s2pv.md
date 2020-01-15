# eraS2pv

```js
pv = ERFA.s2pv(theta, phi, r, td, pd, rd)
```

Convert position/velocity from spherical to Cartesian coordinates.

## Given:
```
   theta    double          longitude angle (radians)
   phi      double          latitude angle (radians)
   r        double          radial distance
   td       double          rate of change of theta
   pd       double          rate of change of phi
   rd       double          rate of change of r
```

## Returned:
```
   pv       double[2][3]    pv-vector
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
