# eraRy

```js
ERFA.ry(theta, r)
```

Rotate an r-matrix about the y-axis.

## Given:
```
   theta  double          angle (radians)
```

## Given and returned:
```
   r      double[3][3]    r-matrix, rotated
```

## Notes:

1) Calling this function with positive theta incorporates in the
   supplied r-matrix r an additional rotation, about the y-axis,
   anticlockwise as seen looking towards the origin from positive y.

## 2) The additional rotation can be represented by this matrix:

```
       (  + cos(theta)     0      - sin(theta)  )
       (                                        )
       (       0           1           0        )
       (                                        )
       (  + sin(theta)     0      + cos(theta)  )
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
