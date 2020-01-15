# eraD2tf

```js
[sign, ihmsf] = ERFA.d2tf(ndp, days)
```

Decompose days to hours, minutes, seconds, fraction.

## Given:
```
   ndp     int     resolution (Note 1)
   days    double  interval in days
```

## Returned:
```
   sign    char    '+' or '-'
   ihmsf   int[4]  hours, minutes, seconds, fraction
```

## Notes:

## 1) The argument ndp is interpreted as follows:

```
   ndp         resolution
    :      ...0000 00 00
   -7         1000 00 00
   -6          100 00 00
   -5           10 00 00
   -4            1 00 00
   -3            0 10 00
   -2            0 01 00
   -1            0 00 10
    0            0 00 01
    1            0 00 00.1
    2            0 00 00.01
    3            0 00 00.001
    :            0 00 00.000...
```

2) The largest positive useful value for ndp is determined by the
   size of days, the format of double on the target platform, and
   the risk of overflowing ihmsf[3].  On a typical platform, for
   days up to 1.0, the available floating-point precision might
   correspond to ndp=12.  However, the practical limit is typically
   ndp=9, set by the capacity of a 32-bit int, or ndp=4 if int is
   only 16 bits.

3) The absolute value of days may exceed 1.0.  In cases where it
   does not, it is up to the caller to test for and handle the
   case where days is very nearly 1.0 and rounds up to 24 hours,
   by testing for ihmsf[0]=24 and setting ihmsf[0-3] to zero.

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
