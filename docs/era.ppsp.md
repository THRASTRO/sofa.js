# eraPpsp

```js
apsb = ERFA.ppsp(a, s, b)
```

P-vector plus scaled p-vector.

## Given:
```
   a      double[3]     first p-vector
   s      double        scalar (multiplier for b)
   b      double[3]     second p-vector
```

## Returned:
```
   apsb   double[3]     a + s*b
```

## Note:
```
   It is permissible for any of a, b and apsb to be the same array.
```

## Called:
```
   eraSxp       multiply p-vector by scalar
   eraPpp       p-vector plus p-vector
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
