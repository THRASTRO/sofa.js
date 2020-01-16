# eraAtci13

```js
[ri, di, eo] = ERFA.atci13(rc, dc, pr, pd, px, rv, date1, date2)
```

Transform ICRS star data, epoch J2000.0, to CIRS.

## Given:
```
   rc     double   ICRS right ascension at J2000.0 (radians, Note 1)
   dc     double   ICRS declination at J2000.0 (radians, Note 1)
   pr     double   RA proper motion (radians/year; Note 2)
   pd     double   Dec proper motion (radians/year)
   px     double   parallax (arcsec)
   rv     double   radial velocity (km/s, +ve if receding)
   date1  double   TDB as a 2-part...
   date2  double   ...Julian Date (Note 3)
```

## Returned:
```
   ri,di  double*  CIRS geocentric RA,Dec (radians)
   eo     double*  equation of the origins (ERA-GST, Note 5)
```

## Notes:

1) Star data for an epoch other than J2000.0 (for example from the
   Hipparcos catalog, which has an epoch of J1991.25) will require a
   preliminary call to [eraPmsafe][1] before use.

2) The proper motion in RA is dRA/dt rather than cos(Dec)*dRA/dt.

3) The TDB date date1+date2 is a Julian Date, apportioned in any
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

4) The available accuracy is better than 1 milliarcsecond, limited
   mainly by the precession-nutation model that is used, namely
   IAU 2000A/2006.  Very close to solar system bodies, additional
   errors of up to several milliarcseconds can occur because of
   unmodeled light deflection;  however, the Sun's contribution is
   taken into account, to first order.  The accuracy limitations of
   the ERFA function [eraEpv00][2] (used to compute Earth position and
   velocity) can contribute aberration errors of up to
   5 microarcseconds.  Light deflection at the Sun's limb is
   uncertain at the 0.4 mas level.

5) Should the transformation to (equinox based) apparent place be
   required rather than (CIO based) intermediate place, subtract the
   equation of the origins from the returned right ascension:
```
   RA = RI - EO. (The eraAnp function can then be applied, as
   required, to keep the result in the conventional 0-2pi range.)
```

## Called:
```
   eraApci13    astrometry parameters, ICRS-CIRS, 2013
   eraAtciq     quick ICRS to CIRS
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.pmsafe.md
[2]: era.epv00.md
