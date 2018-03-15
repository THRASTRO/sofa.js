# iauD2dtf

```js
[rv, iy, im, id, ihmsf] = IAU.d2dtf(scale, ndp, d1, d2)
```

Format for output a 2-part Julian Date (or in the case of UTC a
quasi-JD form that includes special provision for leap seconds).
SOFA (Standards of Fundamental Astronomy) software collection.


## Given:
```
   scale     char[]  time scale ID (Note 1)
   ndp       int     resolution (Note 2)
   d1,d2     double  time as a 2-part Julian Date (Notes 3,4)
```

## Returned:
```
   iy,im,id  int     year, month, day in Gregorian calendar (Note 5)
   ihmsf     int[4]  hours, minutes, seconds, fraction (Note 1)
```

## Returned (function value):
```
             int     status: +1 = dubious year (Note 5)
                              0 = OK
                             -1 = unacceptable date (Note 6)
```

## Notes:

1) scale identifies the time scale.  Only the value "UTC" (in upper
   case) is significant, and enables handling of leap seconds (see
   Note 4).

2) ndp is the number of decimal places in the seconds field, and can
   have negative as well as positive values, such as:

```
   ndp         resolution
   -4            1 00 00
   -3            0 10 00
   -2            0 01 00
   -1            0 00 10
    0            0 00 01
    1            0 00 00.1
    2            0 00 00.01
    3            0 00 00.001
```

   The limits are platform dependent, but a safe range is -5 to +9.

3) d1+d2 is Julian Date, apportioned in any convenient way between
   the two arguments, for example where d1 is the Julian Day Number
   and d2 is the fraction of a day.  In the case of UTC, where the
   use of JD is problematical, special conventions apply:  see the
   next note.

4) JD cannot unambiguously represent UTC during a leap second unless
   special measures are taken.  The SOFA internal convention is that
   the quasi-JD day represents UTC days whether the length is 86399,
   86400 or 86401 SI seconds.  In the 1960-1972 era there were
   smaller jumps (in either direction) each time the linear UTC(TAI)
   expression was changed, and these "mini-leaps" are also included
   in the SOFA convention.

5) The warning status "dubious year" flags UTCs that predate the
   introduction of the time scale or that are too far in the future
   to be trusted.  See iauDat for further details.

6) For calendar conventions and limitations, see iauCal2jd.

## Called:
```
   iauJd2cal    JD to Gregorian calendar
   iauD2tf      decompose days to hms
   iauDat       delta(AT) = TAI-UTC
```

This revision:  2014 February 15

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.