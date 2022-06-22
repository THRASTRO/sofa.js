# eraPvppv

```js
apb = ERFA.pvppv(a, b)
```

Add one pv-vector to another.

## Given:
```
   a        double[2][3]      first pv-vector
   b        double[2][3]      second pv-vector
```

## Returned:
```
   apb      double[2][3]      a + b
```

## Note:
```
   It is permissible to re-use the same array for any of the
   arguments.
```

## Called:
```
   eraPpp       p-vector plus p-vector
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
