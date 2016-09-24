# iauSxpv

```js
spv = IAU.sxpv(s, pv)
```

Multiply a pv-vector by a scalar.

## Given:
```
   s       double          scalar
   pv      double[2][3]    pv-vector
```

## Returned:
```
   spv     double[2][3]    s * pv
```

## Note:
```
   It is permissible for pv and spv to be the same array
```

## Called:
```
   iauS2xpv     multiply pv-vector by two scalars
```

This revision:  2013 August 7

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.