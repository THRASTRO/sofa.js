# eraC2s

```js
[theta, phi] = ERFA.c2s(p)
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

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
