# iauRxpv

```js
rpv = IAU.rxpv(r, pv)
```

Multiply a pv-vector by an r-matrix.

## Given:
```
   r        double[3][3]    r-matrix
   pv       double[2][3]    pv-vector
```

## Returned:
```
   rpv      double[2][3]    r * pv
```

## Note:
```
   It is permissible for pv and rpv to be the same array.
```

## Called:
```
   iauRxp       product of r-matrix and p-vector
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.