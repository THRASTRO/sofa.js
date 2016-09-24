# iauRxp

```js
rp = IAU.rxp(r, p)
```

Multiply a p-vector by an r-matrix.

## Given:
```
   r        double[3][3]    r-matrix
   p        double[3]       p-vector
```

## Returned:
```
   rp       double[3]       r * p
```

## Note:
```
   It is permissible for p and rp to be the same array.
```

## Called:
```
   iauCp        copy p-vector
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.