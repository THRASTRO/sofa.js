# iauS2xpv

```js
spv = IAU.s2xpv(s1, s2, pv)
```

Multiply a pv-vector by two scalars.

## Given:
```
   s1     double         scalar to multiply position component by
   s2     double         scalar to multiply velocity component by
   pv     double[2][3]   pv-vector
```

## Returned:
```
   spv    double[2][3]   pv-vector: p scaled by s1, v scaled by s2
```

## Note:
```
   It is permissible for pv and spv to be the same array.
```

## Called:
```
   iauSxp       multiply p-vector by scalar
```

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.