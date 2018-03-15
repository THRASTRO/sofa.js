# iauPn

```js
[r, u] = IAU.pn(p)
```

Convert a p-vector into modulus and unit vector.

## Given:
```
   p        double[3]      p-vector
```

## Returned:
```
   r        double         modulus
   u        double[3]      unit vector
```

## Notes:

1) If p is null, the result is null.  Otherwise the result is a unit
   vector.

2) It is permissible to re-use the same array for any of the
   arguments.

## Called:
```
   iauPm        modulus of p-vector
   iauZp        zero p-vector
   iauSxp       multiply p-vector by scalar
```

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.