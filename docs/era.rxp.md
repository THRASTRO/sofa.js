# eraRxp

```js
rp = ERFA.rxp(r, p)
```

Multiply a p-vector by an r-matrix.

## Given:
```
   r        double[3][3]    r-matrix
   p        double[3]       p-vector
```

## Returned:
```
   rp       double[3]       r * p
```

## Note:
```
   It is permissible for p and rp to be the same array.
```

## Called:
```
   eraCp        copy p-vector
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
