# eraRxpv

```js
rpv = ERFA.rxpv(r, pv)
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
   eraRxp       product of r-matrix and p-vector
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
