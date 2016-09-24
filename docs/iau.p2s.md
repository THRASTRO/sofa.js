# iauP2s

```js
[theta, phi, r] = IAU.p2s(p)
```

P-vector to spherical polar coordinates.

## Given:
```
   p        double[3]    p-vector
```

## Returned:
```
   theta    double       longitude angle (radians)
   phi      double       latitude angle (radians)
   r        double       radial distance
```

## Notes:

1) If P is null, zero theta, phi and r are returned.

2) At either pole, zero theta is returned.

## Called:
```
   iauC2s       p-vector to spherical
   iauPm        modulus of p-vector
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.