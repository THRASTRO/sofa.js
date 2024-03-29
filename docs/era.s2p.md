# eraS2p

```js
p = ERFA.s2p(theta, phi, r)
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
   eraS2c       spherical coordinates to unit vector
   eraSxp       multiply p-vector by scalar
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
