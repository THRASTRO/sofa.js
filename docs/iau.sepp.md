# iauSepp

```js
rv = IAU.sepp(a, b)
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
   iauPxp       vector product of two p-vectors
   iauPm        modulus of p-vector
   iauPdp       scalar product of two p-vectors
```

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.