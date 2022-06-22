# eraJd2cal

```js
[rv, iy, im, id, fd] = ERFA.jd2cal(dj1, dj2)
```

Julian Date to Gregorian year, month, day, and fraction of a day.

## Given:
```
   dj1,dj2   double   Julian Date (Notes 1, 2)
```

## Returned (arguments):
```
   iy        int      year
   im        int      month
   id        int      day
   fd        double   fraction of day
```

## Returned (function value):
```
             int      status:
                         0 = OK
                        -1 = unacceptable date (Note 1)
```

## Notes:

1) The earliest valid date is -68569.5 (-4900 March 1).  The
   largest value accepted is 1e9.

2) The Julian Date is apportioned in any convenient way between
   the arguments dj1 and dj2.  For example, JD=2450123.7 could
   be expressed in any of these ways, among others:

```
          dj1             dj2

       2450123.7           0.0       (JD method)
       2451545.0       -1421.3       (J2000 method)
       2400000.5       50123.2       (MJD method)
       2450123.5           0.2       (date & time method)
```

   Separating integer and fraction uses the "compensated summation"
   algorithm of Kahan-Neumaier to preserve as much precision as
   possible irrespective of the jd1+jd2 apportionment.

3) In early eras the conversion is from the "proleptic Gregorian
   calendar";  no account is taken of the date(s) of adoption of
   the Gregorian calendar, nor is the AD/BC numbering convention
   observed.

## References:

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992),
   Section 12.92 (p604).

   Klein, A., A Generalized Kahan-Babuska-Summation-Algorithm.
   Computing, 76, 279-293 (2006), Section 3.

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
