# eraC2tpe

```js
rc2t = ERFA.c2tpe(tta, ttb, uta, utb, dpsi, deps, xp, yp)
```

Form the celestial to terrestrial matrix given the date, the UT1,
the nutation and the polar motion.  IAU 2000.

## Given:
```
   tta,ttb    double        TT as a 2-part Julian Date (Note 1)
   uta,utb    double        UT1 as a 2-part Julian Date (Note 1)
   dpsi,deps  double        nutation (Note 2)
   xp,yp      double        coordinates of the pole (radians, Note 3)
```

## Returned:
```
   rc2t       double[3][3]  celestial-to-terrestrial matrix (Note 4)
```

## Notes:

1) The TT and UT1 dates tta+ttb and uta+utb are Julian Dates,
   apportioned in any convenient way between the arguments uta and
   utb.  For example, JD(UT1)=2450123.7 could be expressed in any of
   these ways, among others:

```
           uta            utb

       2450123.7           0.0       (JD method)
       2451545.0       -1421.3       (J2000 method)
       2400000.5       50123.2       (MJD method)
       2450123.5           0.2       (date & time method)
```

   The JD method is the most natural and convenient to use in
   cases where the loss of several decimal digits of resolution is
   acceptable.  The J2000 and MJD methods are good compromises
   between resolution and convenience.  In the case of uta,utb, the
   date & time method is best matched to the Earth rotation angle
   algorithm used:  maximum precision is delivered when the uta
   argument is for 0hrs UT1 on the day in question and the utb
   argument lies in the range 0 to 1, or vice versa.

2) The caller is responsible for providing the nutation components;
   they are in longitude and obliquity, in radians and are with
   respect to the equinox and ecliptic of date.  For high-accuracy
   applications, free core nutation should be included as well as
   any other relevant corrections to the position of the CIP.

3) The arguments xp and yp are the coordinates (in radians) of the
   Celestial Intermediate Pole with respect to the International
   Terrestrial Reference System (see IERS Conventions 2003),
   measured along the meridians 0 and 90 deg west respectively.

4) The matrix rc2t transforms from celestial to terrestrial
   coordinates:

```
      [TRS] = RPOM * R_3(GST) * RBPN * [CRS]

            = rc2t * [CRS]
```

   where [CRS] is a vector in the Geocentric Celestial Reference
   System and [TRS] is a vector in the International Terrestrial
   Reference System (see IERS Conventions 2003), RBPN is the
   bias-precession-nutation matrix, GST is the Greenwich (apparent)
   Sidereal Time and RPOM is the polar motion matrix.

5) Although its name does not include "00", This function is in fact
   specific to the IAU 2000 models.

## Called:
```
   eraPn00      bias/precession/nutation results, IAU 2000
   eraGmst00    Greenwich mean sidereal time, IAU 2000
   eraSp00      the TIO locator s', IERS 2000
   eraEe00      equation of the equinoxes, IAU 2000
   eraPom00     polar motion matrix
   eraC2teqx    form equinox-based celestial-to-terrestrial matrix
```

## Reference:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
