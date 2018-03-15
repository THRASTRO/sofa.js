# iauTrxp

```js
trp = IAU.trxp(r, p)
```

Multiply a p-vector by the transpose of an r-matrix.

## Given:
```
   r        double[3][3]   r-matrix
   p        double[3]      p-vector
```

## Returned:
```
   trp      double[3]      r * p
```

## Note:
```
   It is permissible for p and trp to be the same array.
```

## Called:
```
   iauTr        transpose r-matrix
   iauRxp       product of r-matrix and p-vector
```

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.