# eraRv2m

```js
r = ERFA.rv2m(w, r)
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

2) If w is null, the identity matrix is returned.

3) The reference frame rotates clockwise as seen looking along the
   rotation vector from the origin.

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
