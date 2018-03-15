# iauPvdpv

```js
adb = IAU.pvdpv(a, b)
```

Inner (=scalar=dot) product of two pv-vectors.

## Given:
```
   a        double[2][3]      first pv-vector
   b        double[2][3]      second pv-vector
```

## Returned:
```
   adb      double[2]         a . b (see note)
```

## Note:

```
   If the position and velocity components of the two pv-vectors are
   ( ap, av ) and ( bp, bv ), the result, a . b, is the pair of
   numbers ( ap . bp , ap . bv + av . bp ).  The two numbers are the
   dot-product of the two p-vectors and its derivative.
```

## Called:
```
   iauPdp       scalar product of two p-vectors
```

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.