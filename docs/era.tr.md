# eraTr

```js
rt = ERFA.tr(r)
```

Transpose an r-matrix.

## Given:
```
   r        double[3][3]    r-matrix
```

## Returned:
```
   rt       double[3][3]    transpose
```

## Note:
```
   It is permissible for r and rt to be the same array.
```

## Called:
```
   eraCr        copy r-matrix
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
