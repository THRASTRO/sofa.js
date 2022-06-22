# eraAtccq

```js
[ra, da] = ERFA.atccq(rc, dc, pr, pd, px, rv, astrom)
```

Quick transformation of a star's ICRS catalog entry (epoch J2000.0)
into ICRS astrometric place, given precomputed star-independent
astrometry parameters.

Use of this function is appropriate when efficiency is important and
where many star positions are to be transformed for one date.  The
star-independent parameters can be obtained by calling one of the
functions [eraApci][1], [eraApcg][2], [eraApco][3] or [eraApcs][4].

If the parallax and proper motions are zero the transformation has
no effect.

## Given:
```
   rc,dc  double     ICRS RA,Dec at J2000.0 (radians)
   pr     double     RA proper motion (radians/year, Note 3)
   pd     double     Dec proper motion (radians/year)
   px     double     parallax (arcsec)
   rv     double     radial velocity (km/s, +ve if receding)
   astrom ASTROM* star-independent astrometry parameters:
    pmt    double       PM time interval (SSB, Julian years)
    eb     double[3]    SSB to observer (vector, au)
    eh     double[3]    Sun to observer (unit vector)
    em     double       distance from Sun to observer (au)
    v      double[3]    barycentric observer velocity (vector, c)
    bm1    double       sqrt(1-|v|^2): reciprocal of Lorenz factor
    bpn    double[3][3] bias-precession-nutation matrix
    along  double       longitude + s' (radians)
    xpl    double       polar motion xp wrt local meridian (radians)
    ypl    double       polar motion yp wrt local meridian (radians)
    sphi   double       sine of geodetic latitude
    cphi   double       cosine of geodetic latitude
    diurab double       magnitude of diurnal aberration vector
    eral   double       "local" Earth rotation angle (radians)
    refa   double       refraction constant A (radians)
    refb   double       refraction constant B (radians)
```

## Returned:
```
   ra,da  double*    ICRS astrometric RA,Dec (radians)
```

## Notes:

1) All the vectors are with respect to BCRS axes.

2) Star data for an epoch other than J2000.0 (for example from the
   Hipparcos catalog, which has an epoch of J1991.25) will require a
   preliminary call to [eraPmsafe][5] before use.

3) The proper motion in RA is dRA/dt rather than cos(Dec)*dRA/dt.

## Called:
```
   eraPmpx      proper motion and parallax
   eraC2s       p-vector to spherical
   eraAnp       normalize angle into range 0 to 2pi
```

This revision:   2021 April 18

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.apci.md
[2]: era.apcg.md
[3]: era.apco.md
[4]: era.apcs.md
[5]: era.pmsafe.md
