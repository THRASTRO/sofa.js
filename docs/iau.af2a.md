# iauAf2a

```js
[rv, rad] = IAU.af2a(s, ideg, iamin, asec)
```

Convert degrees, arcminutes, arcseconds to radians.
SOFA (Standards of Fundamental Astronomy) software collection.


## Given:
```
   s         char    sign:  '-' = negative, otherwise positive
   ideg      int     degrees
   iamin     int     arcminutes
   asec      double  arcseconds
```

## Returned:
```
   rad       double  angle in radians
```

## Returned (function value):
```
             int     status:  0 = OK
                              1 = ideg outside range 0-359
                              2 = iamin outside range 0-59
                              3 = asec outside range 0-59.999...
```

## Notes:

1)  The result is computed even if any of the range checks fail.

2)  Negative ideg, iamin and/or asec produce a warning status, but
    the absolute value is used in the conversion.

3)  If there are multiple errors, the status value reflects only the
    first, the smallest taking precedence.

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.