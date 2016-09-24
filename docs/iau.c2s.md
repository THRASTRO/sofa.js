# iauC2s

```js
[theta, phi] = IAU.c2s(p)
```

P-vector to spherical coordinates.

## Given:
```
   p      double[3]    p-vector
```

## Returned:
```
   theta  double       longitude angle (radians)
   phi    double       latitude angle (radians)
```

## Notes:

1) The vector p can have any magnitude; only its direction is used.

2) If p is null, zero theta and phi are returned.

3) At either pole, zero theta is returned.

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.