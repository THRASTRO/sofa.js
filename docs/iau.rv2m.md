# iauRv2m

```js
r = IAU.rv2m(w, r)
```

Form the r-matrix corresponding to a given r-vector.

## Given:
```
   w        double[3]      rotation vector (Note 1)
```

## Returned:
```
   r        double[3][3]    rotation matrix
```

## Notes:

1) A rotation matrix describes a rotation through some angle about
   some arbitrary axis called the Euler axis.  The "rotation vector"
   supplied to This function has the same direction as the Euler
   axis, and its magnitude is the angle in radians.

2) If w is null, the unit matrix is returned.

3) The reference frame rotates clockwise as seen looking along the
   rotation vector from the origin.

This revision:  2015 January 30

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.