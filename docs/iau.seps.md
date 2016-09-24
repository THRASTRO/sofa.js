# iauSeps

```js
rv = IAU.seps(al, ap, bl, bp)
```

Angular separation between two sets of spherical coordinates.

## Given:
```
   al     double       first longitude (radians)
   ap     double       first latitude (radians)
   bl     double       second longitude (radians)
   bp     double       second latitude (radians)
```

## Returned (function value):
```
          double       angular separation (radians)
```

## Called:
```
   iauS2c       spherical coordinates to unit vector
   iauSepp      angular separation between two p-vectors
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.