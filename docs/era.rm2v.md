# eraRm2v

```js
w = ERFA.rm2v(r)
```

Express an r-matrix as an r-vector.

## Given:
```
   r        double[3][3]    rotation matrix
```

## Returned:
```
   w        double[3]       rotation vector (Note 1)
```

## Notes:

1) A rotation matrix describes a rotation through some angle about
   some arbitrary axis called the Euler axis.  The "rotation vector"
   returned by this function has the same direction as the Euler axis,
   and its magnitude is the angle in radians.  (The magnitude and
   direction can be separated by means of the function [eraPn][1].)

2) If r is null, so is the result.  If r is not a rotation matrix
   the result is undefined;  r must be proper (i.e. have a positive
   determinant) and real orthogonal (inverse = transpose).

3) The reference frame rotates clockwise as seen looking along
   the rotation vector from the origin.

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.pn.md
