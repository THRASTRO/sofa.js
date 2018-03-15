# iauPvmpv

```js
amb = IAU.pvmpv(a, b)
```

Subtract one pv-vector from another.

## Given:
```
   a       double[2][3]      first pv-vector
   b       double[2][3]      second pv-vector
```

## Returned:
```
   amb     double[2][3]      a - b
```

## Note:
```
   It is permissible to re-use the same array for any of the
   arguments.
```

## Called:
```
   iauPmp       p-vector minus p-vector
```

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.