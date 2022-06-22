# eraAtic13

```js
[rc, dc, eo] = ERFA.atic13(ri, di, date1, date2)
```

Transform star RA,Dec from geocentric CIRS to ICRS astrometric.

## Given:
```
   ri,di  double  CIRS geocentric RA,Dec (radians)
   date1  double  TDB as a 2-part...
   date2  double  ...Julian Date (Note 1)
```

## Returned:
```
   rc,dc  double  ICRS astrometric RA,Dec (radians)
   eo     double  equation of the origins (ERA-GST, Note 4)
```

## Notes:

1) The TDB date date1+date2 is a Julian Date, apportioned in any
   convenient way between the two arguments.  For example,
   JD(TDB)=2450123.7 could be expressed in any of these ways, among
   others:

```
          date1          date2

       2450123.7           0.0       (JD method)
       2451545.0       -1421.3       (J2000 method)
       2400000.5       50123.2       (MJD method)
       2450123.5           0.2       (date & time method)
```

   The JD method is the most natural and convenient to use in cases
   where the loss of several decimal digits of resolution is
   acceptable.  The J2000 method is best matched to the way the
   argument is handled internally and will deliver the optimum
   resolution.  The MJD method and the date & time methods are both
   good compromises between resolution and convenience.  For most
   applications of this function the choice will not be at all
   critical.

   TT can be used instead of TDB without any significant impact on
   accuracy.

2) Iterative techniques are used for the aberration and light
   deflection corrections so that the functions [eraAtic13][1] (or
   [eraAticq][2]) and [eraAtci13][3] (or [eraAtciq][4]) are accurate inverses;
   even at the edge of the Sun's disk the discrepancy is only about
   1 nanoarcsecond.

3) The available accuracy is better than 1 milliarcsecond, limited
   mainly by the precession-nutation model that is used, namely
   IAU 2000A/2006.  Very close to solar system bodies, additional
   errors of up to several milliarcseconds can occur because of
   unmodeled light deflection;  however, the Sun's contribution is
   taken into account, to first order.  The accuracy limitations of
   the ERFA function [eraEpv00][5] (used to compute Earth position and
   velocity) can contribute aberration errors of up to
   5 microarcseconds.  Light deflection at the Sun's limb is
   uncertain at the 0.4 mas level.

4) Should the transformation to (equinox based) J2000.0 mean place
   be required rather than (CIO based) ICRS coordinates, subtract the
   equation of the origins from the returned right ascension:
```
   RA = RI - EO.  (The eraAnp function can then be applied, as
   required, to keep the result in the conventional 0-2pi range.)
```

## Called:
```
   eraApci13    astrometry parameters, ICRS-CIRS, 2013
   eraAticq     quick CIRS to ICRS astrometric
```

This revision:   2013 October 9

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.atic13.md
[2]: era.aticq.md
[3]: era.atci13.md
[4]: era.atciq.md
[5]: era.epv00.md
