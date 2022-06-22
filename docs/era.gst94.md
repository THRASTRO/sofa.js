# eraGst94

```js
rv = ERFA.gst94(uta, utb)
```

Greenwich apparent sidereal time (consistent with IAU 1982/94
resolutions).

## Given:
```
   uta,utb    double    UT1 as a 2-part Julian Date (Notes 1,2)
```

## Returned (function value):
```
              double    Greenwich apparent sidereal time (radians)
```

## Notes:

1) The UT1 date uta+utb is a Julian Date, apportioned in any
   convenient way between the argument pair.  For example,
   JD(UT1)=2450123.7 could be expressed in any of these ways, among
   others:

```
           uta            utb

       2450123.7           0.0       (JD method)
       2451545.0       -1421.3       (J2000 method)
       2400000.5       50123.2       (MJD method)
       2450123.5           0.2       (date & time method)
```

   The JD method is the most natural and convenient to use in cases
   where the loss of several decimal digits of resolution is
   acceptable.  The J2000 and MJD methods are good compromises
   between resolution and convenience.  For UT, the date & time
   method is best matched to the algorithm that is used by the Earth
   Rotation Angle function, called internally:  maximum precision is
   delivered when the uta argument is for 0hrs UT1 on the day in
   question and the utb argument lies in the range 0 to 1, or vice
   versa.

2) The result is compatible with the IAU 1982 and 1994 resolutions,
   except that accuracy has been compromised for the sake of
   convenience in that UT is used instead of TDB (or TT) to compute
   the equation of the equinoxes.

3) This GAST must be used only in conjunction with contemporaneous
   IAU standards such as 1976 precession, 1980 obliquity and 1982
   nutation.  It is not compatible with the IAU 2000 resolutions.

4) The result is returned in the range 0 to 2pi.

## Called:
```
   eraGmst82    Greenwich mean sidereal time, IAU 1982
   eraEqeq94    equation of the equinoxes, IAU 1994
   eraAnp       normalize angle into range 0 to 2pi
```

## References:

   Explanatory Supplement to the Astronomical Almanac,
   P. Kenneth Seidelmann (ed), University Science Books (1992)

   IAU Resolution C7, Recommendation 3 (1994)

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
