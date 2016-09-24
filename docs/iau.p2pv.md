# iauP2pv

```js
pv = IAU.p2pv(p)
```

Extend a p-vector to a pv-vector by appending a zero velocity.

## Given:
```
   p        double[3]       p-vector
```

## Returned:
```
   pv       double[2][3]    pv-vector
```

## Called:
```
   iauCp        copy p-vector
   iauZp        zero p-vector
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.