# iauAticqn

```js
[rc, dc] = IAU.aticqn(ri, di, astrom, n, b)
```

Quick CIRS to ICRS astrometric place transformation, given the star-
independent astrometry parameters plus a list of light-deflecting
bodies.

Use of this function is appropriate when efficiency is important and
where many star positions are all to be transformed for one date.
The star-independent astrometry parameters can be obtained by
calling one of the functions [iauApci][1], [iauApcg][2], [iauApco][3]
or [iauApcs][4].
*
*  If the only light-deflecting body to be taken into account is the
*  Sun, the [iauAticq][5] function can be used instead.

## Given:
```
   ri,di  double      CIRS RA,Dec (radians)
   astrom ASTROM*  star-independent astrometry parameters:
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
    n     int           number of bodies (Note 3)
    b     LDBODY[n] data for each of the n bodies (Notes 3,4):
     bm    double       mass of the body (solar masses, Note 5)
     dl    double       deflection limiter (Note 6)
     pv    [2][3]       barycentric PV of the body (au, au/day)
```

## Returned:
```
   rc,dc  double     ICRS astrometric RA,Dec (radians)
```

## Notes:

1) Iterative techniques are used for the aberration and light
   deflection corrections so that the functions [iauAticqn][6] and
   [iauAtciqn][7] are accurate inverses; even at the edge of the Sun's
   disk the discrepancy is only about 1 nanoarcsecond.

2) If the only light-deflecting body to be taken into account is the
   Sun, the [iauAticq][5] function can be used instead.

3) The struct b contains n entries, one for each body to be
   considered.  If n = 0, no gravitational light deflection will be
   applied, not even for the Sun.

4) The struct b should include an entry for the Sun as well as for
   any planet or other body to be taken into account.  The entries
   should be in the order in which the light passes the body.

5) In the entry in the b struct for body i, the mass parameter
   b[i].bm can, as required, be adjusted in order to allow for such
   effects as quadrupole field.

6) The deflection limiter parameter b[i].dl is phi^2/2, where phi is
   the angular separation (in radians) between star and body at
   which limiting is applied.  As phi shrinks below the chosen
   threshold, the deflection is artificially reduced, reaching zero
   for phi = 0.   Example values suitable for a terrestrial
   observer, together with masses, are as follows:

```
      body i     b[i].bm        b[i].dl

      Sun        1.0            6e-6
      Jupiter    0.00095435     3e-9
      Saturn     0.00028574     3e-10
```

7) For efficiency, validation of the contents of the b array is
   omitted.  The supplied masses must be greater than zero, the
   position and velocity vectors must be right, and the deflection
   limiter greater than zero.

## Called:
```
   iauS2c       spherical coordinates to unit vector
   iauTrxp      product of transpose of r-matrix and p-vector
   iauZp        zero p-vector
   iauAb        stellar aberration
   iauLdn       light deflection by n bodies
   iauC2s       p-vector to spherical
   iauAnp       normalize angle into range +/- pi
```

This revision:   2013 October 9

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.

[1]: iau.apci.md
[2]: iau.apcg.md
[3]: iau.apco.md
[4]: iau.apcs.md
[5]: iau.aticq.md
[6]: iau.aticqn.md
[7]: iau.atciqn.md