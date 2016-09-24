# iauRxr

```js
atb = IAU.rxr(a, b)
```

Multiply two r-matrices.

## Given:
```
   a        double[3][3]    first r-matrix
   b        double[3][3]    second r-matrix
```

## Returned:
```
   atb      double[3][3]    a * b
```

## Note:
```
   It is permissible to re-use the same array for any of the
   arguments.
```

## Called:
```
   iauCr        copy r-matrix
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.