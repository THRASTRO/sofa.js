# eraPn

```js
[r, u] = ERFA.pn(p)
```

Convert a p-vector into modulus and unit vector.

## Given:
```
   p        double[3]      p-vector
```

## Returned:
```
   r        double         modulus
   u        double[3]      unit vector
```

## Notes:

1) If p is null, the result is null.  Otherwise the result is a unit
   vector.

2) It is permissible to re-use the same array for any of the
   arguments.

## Called:
```
   eraPm        modulus of p-vector
   eraZp        zero p-vector
   eraSxp       multiply p-vector by scalar
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
