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
   trpv     double[2][3]    r^T * pv
```

## Notes:

1) The algorithm is for the simple case where the r-matrix r is not
   a function of time.  The case where r is a function of time leads
   to an additional velocity component equal to the product of the
   derivative of the transpose of r and the position vector.

2) It is permissible for pv and rpv to be the same array.

## Called:
```
   eraTr        transpose r-matrix
   eraRxpv      product of r-matrix and pv-vector
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
