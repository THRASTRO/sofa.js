# iauTrxpv

```js
trpv = IAU.trxpv(r, pv)
```

Multiply a pv-vector by the transpose of an r-matrix.

## Given:
```
   r        double[3][3]    r-matrix
   pv       double[2][3]    pv-vector
```

## Returned:
```
   trpv     double[2][3]    r * pv
```

## Note:
```
   It is permissible for pv and trpv to be the same array.
```

## Called:
```
   iauTr        transpose r-matrix
   iauRxpv      product of r-matrix and pv-vector
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.