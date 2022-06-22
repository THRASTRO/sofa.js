# eraSepp

```js
rv = ERFA.sepp(a, b)
```

Angular separation between two p-vectors.

## Given:
```
   a      double[3]    first p-vector (not necessarily unit length)
   b      double[3]    second p-vector (not necessarily unit length)
```

## Returned (function value):
```
          double       angular separation (radians, always positive)
```

## Notes:

1) If either vector is null, a zero result is returned.

2) The angular separation is most simply formulated in terms of
   scalar product.  However, this gives poor accuracy for angles
   near zero and pi.  The present algorithm uses both cross product
   and dot product, to deliver full accuracy whatever the size of
   the angle.

## Called:
```
   eraPxp       vector product of two p-vectors
   eraPm        modulus of p-vector
   eraPdp       scalar product of two p-vectors
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
