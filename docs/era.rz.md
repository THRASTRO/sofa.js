# eraRz

```js
ERFA.rz(psi, r)
```

Rotate an r-matrix about the z-axis.

## Given:
```
   psi    double          angle (radians)
```

## Given and returned:
```
   r      double[3][3]    r-matrix, rotated
```

## Notes:

1) Calling this function with positive psi incorporates in the
   supplied r-matrix r an additional rotation, about the z-axis,
   anticlockwise as seen looking towards the origin from positive z.

## 2) The additional rotation can be represented by this matrix:

```
       (  + cos(psi)   + sin(psi)     0  )
       (                                 )
       (  - sin(psi)   + cos(psi)     0  )
       (                                 )
       (       0            0         1  )
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
