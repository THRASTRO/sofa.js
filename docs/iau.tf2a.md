# iauTf2a

```js
[rv, rad] = IAU.tf2a(s, ihour, imin, sec)
```

Convert hours, minutes, seconds to radians.

## Given:
```
   s         char    sign:  '-' = negative, otherwise positive
   ihour     int     hours
   imin      int     minutes
   sec       double  seconds
```

## Returned:
```
   rad       double  angle in radians
```

## Returned (function value):
```
             int     status:  0 = OK
                              1 = ihour outside range 0-23
                              2 = imin outside range 0-59
                              3 = sec outside range 0-59.999...
```

## Notes:

1)  The result is computed even if any of the range checks fail.

2)  Negative ihour, imin and/or sec produce a warning status, but
    the absolute value is used in the conversion.

3)  If there are multiple errors, the status value reflects only the
    first, the smallest taking precedence.

This revision:  2013 June 18

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.