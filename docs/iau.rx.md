# iauRx

```js
IAU.rx(phi, r)
```

Rotate an r-matrix about the x-axis.

## Given:
```
   phi    double          angle (radians)
```

## Given and returned:
```
   r      double[3][3]    r-matrix, rotated
```

## Notes:

1) Calling this function with positive phi incorporates in the
   supplied r-matrix r an additional rotation, about the x-axis,
   anticlockwise as seen looking towards the origin from positive x.

## 2) The additional rotation can be represented by this matrix:

```
       (  1        0            0      )
       (                               )
       (  0   + cos(phi)   + sin(phi)  )
       (                               )
       (  0   - sin(phi)   + cos(phi)  )
```

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.