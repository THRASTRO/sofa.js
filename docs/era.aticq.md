# eraAticq

```js
[rc, dc] = ERFA.aticq(ri, di, astrom)
```

Quick CIRS RA,Dec to ICRS astrometric place, given the star-
independent astrometry parameters.

Use of this function is appropriate when efficiency is important and
where many star positions are all to be transformed for one date.
The star-independent astrometry parameters can be obtained by
calling one of the functions [eraApci][1], [eraApcg][2], [eraApco][3]
or [eraApcs][4].

## Given:
```
   ri,di  double     CIRS RA,Dec (radians)
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
   rc,dc  double     ICRS astrometric RA,Dec (radians)
```

## Notes:

1) Only the Sun is taken into account in the light deflection
   correction.

2) Iterative techniques are used for the aberration and light
   deflection corrections so that the functions [eraAtic13][5] (or
   [eraAticq][6]) and [eraAtci13][7] (or [eraAtciq][8]) are accurate inverses;
   even at the edge of the Sun's disk the discrepancy is only about
   1 nanoarcsecond.

## Called:
```
   eraS2c       spherical coordinates to unit vector
   eraTrxp      product of transpose of r-matrix and p-vector
   eraZp        zero p-vector
   eraAb        stellar aberration
   eraLdsun     light deflection by the Sun
   eraC2s       p-vector to spherical
   eraAnp       normalize angle into range +/- pi
```

This revision:   2013 October 9

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.apci.md
[2]: era.apcg.md
[3]: era.apco.md
[4]: era.apcs.md
[5]: era.atic13.md
[6]: era.aticq.md
[7]: era.atci13.md
[8]: era.atciq.md
