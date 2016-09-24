# iauPvxpv

```js
axb = IAU.pvxpv(a, b)
```

Outer (=vector=cross) product of two pv-vectors.

## Given:
```
   a        double[2][3]      first pv-vector
   b        double[2][3]      second pv-vector
```

## Returned:
```
   axb      double[2][3]      a x b
```

## Notes:

1) If the position and velocity components of the two pv-vectors are
   ( ap, av ) and ( bp, bv ), the result, a x b, is the pair of
   vectors ( ap x bp, ap x bv + av x bp ).  The two vectors are the
   cross-product of the two p-vectors and its derivative.

2) It is permissible to re-use the same array for any of the
   arguments.

## Called:
```
   iauCpv       copy pv-vector
   iauPxp       vector product of two p-vectors
   iauPpp       p-vector plus p-vector
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.