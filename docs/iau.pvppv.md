# iauPvppv

```js
apb = IAU.pvppv(a, b)
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
   iauPpp       p-vector plus p-vector
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.