# iauS2p

```js
p = IAU.s2p(theta, phi, r)
```

Convert spherical polar coordinates to p-vector.

## Given:
```
   theta   double       longitude angle (radians)
   phi     double       latitude angle (radians)
   r       double       radial distance
```

## Returned:
```
   p       double[3]    Cartesian coordinates
```

## Called:
```
   iauS2c       spherical coordinates to unit vector
   iauSxp       multiply p-vector by scalar
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.