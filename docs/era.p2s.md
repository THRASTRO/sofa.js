# eraP2s

```js
[theta, phi, r] = ERFA.p2s(p)
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
   eraC2s       p-vector to spherical
   eraPm        modulus of p-vector
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
