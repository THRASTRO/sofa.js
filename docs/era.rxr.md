# eraRxr

```js
atb = ERFA.rxr(a, b)
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
   eraCr        copy r-matrix
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
