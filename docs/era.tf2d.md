# eraTf2d

```js
[rv, days] = ERFA.tf2d(s, ihour, imin, sec)
```

Convert hours, minutes, seconds to days.

## Given:
```
   s         char    sign:  '-' = negative, otherwise positive
   ihour     int     hours
   imin      int     minutes
   sec       double  seconds
```

## Returned:
```
   days      double  interval in days
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

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
