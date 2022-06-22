# eraJdcalf

```js
[rv, iymdf, calendar] = ERFA.jdcalf(ndp, dj1, dj2)
```

Julian Date to Gregorian Calendar, expressed in a form convenient
for formatting messages:  rounded to a specified precision.

## Given:
```
   ndp       int      number of decimal places of days in fraction
   dj1,dj2   double   dj1+dj2 = Julian Date (Note 1)
```

## Returned:
```
   iymdf     int[4]   year, month, day, fraction in Gregorian
                      calendar
```

## Returned (function value):
```
             int      status:
                        -1 = date out of range
                         0 = OK
                        +1 = NDP not 0-9 (interpreted as 0)
```

## Notes:

1) The Julian Date is apportioned in any convenient way between
   the arguments dj1 and dj2.  For example, JD=2450123.7 could
   be expressed in any of these ways, among others:

```
           dj1            dj2

       2450123.7           0.0       (JD method)
       2451545.0       -1421.3       (J2000 method)
       2400000.5       50123.2       (MJD method)
       2450123.5           0.2       (date & time method)
```

2) In early eras the conversion is from the "Proleptic Gregorian
   Calendar";  no account is taken of the date(s) of adoption of
   the Gregorian Calendar, nor is the AD/BC numbering convention
   observed.

3) See also the function [eraJd2cal][1].

4) The number of decimal places ndp should be 4 or less if internal
   overflows are to be avoided on platforms which use 16-bit
   integers.

## Called:
```
   eraJd2cal    JD to Gregorian calendar
```

## Reference:

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992),
   Section 12.92 (p604).

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.jd2cal.md
