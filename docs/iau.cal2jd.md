# iauCal2jd

```js
[rv, djm0, djm] = IAU.cal2jd(iy, im, id)
```

Gregorian Calendar to Julian Date.

## Given:
```
   iy,im,id  int     year, month, day in Gregorian calendar (Note 1)
```

## Returned:
```
   djm0      double  MJD zero-point: always 2400000.5
   djm       double  Modified Julian Date for 0 hrs
```

## Returned (function value):
```
             int     status:
                         0 = OK
                        -1 = bad year   (Note 3: JD not computed)
                        -2 = bad month  (JD not computed)
                        -3 = bad day    (JD computed)
```

## Notes:

1) The algorithm used is valid from -4800 March 1, but this
   implementation rejects dates before -4799 January 1.

2) The Julian Date is returned in two pieces, in the usual SOFA
   manner, which is designed to preserve time resolution.  The
   Julian Date is available as a single number by adding djm0 and
   djm.

3) In early eras the conversion is from the "Proleptic Gregorian
   Calendar";  no account is taken of the date(s) of adoption of
   the Gregorian Calendar, nor is the AD/BC numbering convention
   observed.

## Reference:

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992),
   Section 12.92 (p604).

This revision:  2013 August 7

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.