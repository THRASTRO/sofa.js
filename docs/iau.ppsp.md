# iauPpsp

```js
apsb = IAU.ppsp(a, s, b)
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
   iauSxp       multiply p-vector by scalar
   iauPpp       p-vector plus p-vector
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.