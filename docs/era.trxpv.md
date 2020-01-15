# eraTrxpv

```js
trpv = ERFA.trxpv(r, pv)
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
   eraTr        transpose r-matrix
   eraRxpv      product of r-matrix and pv-vector
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
