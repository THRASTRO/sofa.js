# iauS2pv

```js
pv = IAU.s2pv(theta, phi, r, td, pd, rd)
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

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.