# eraGst00b

```js
rv = ERFA.gst00b(uta, utb)
```

Greenwich apparent sidereal time (consistent with IAU 2000
resolutions but using the truncated nutation model IAU 2000B).

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
   JD(UT1)=2450123.7 could be expressed in any of these ways,
   among others:

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

2) The result is compatible with the IAU 2000 resolutions, except
   that accuracy has been compromised for the sake of speed and
   convenience in two respects:

```
   . UT is used instead of TDB (or TT) to compute the precession
     component of GMST and the equation of the equinoxes.  This
     results in errors of order 0.1 mas at present.
```

   . The IAU 2000B abridged nutation model (McCarthy & Luzum, 2003)
     is used, introducing errors of up to 1 mas.

3) This GAST is compatible with the IAU 2000 resolutions and must be
   used only in conjunction with other IAU 2000 compatible
   components such as precession-nutation.

4) The result is returned in the range 0 to 2pi.

5) The algorithm is from Capitaine et al. (2003) and IERS
   Conventions 2003.

## Called:
```
   eraGmst00    Greenwich mean sidereal time, IAU 2000
   eraEe00b     equation of the equinoxes, IAU 2000B
   eraAnp       normalize angle into range 0 to 2pi
```

## References:

   Capitaine, N., Wallace, P.T. and McCarthy, D.D., "Expressions to
   implement the IAU 2000 definition of UT1", Astronomy &
   Astrophysics, 406, 1135-1149 (2003)

   McCarthy, D.D. & Luzum, B.J., "An abridged model of the
   precession-nutation of the celestial pole", Celestial Mechanics &
   Dynamical Astronomy, 85, 37-49 (2003)

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
