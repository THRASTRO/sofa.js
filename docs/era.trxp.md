# eraTrxp

```js
trp = ERFA.trxp(r, p)
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
   eraTr        transpose r-matrix
   eraRxp       product of r-matrix and p-vector
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
