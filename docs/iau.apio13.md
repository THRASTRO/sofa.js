# iauApio13

```js
[rv, astrom, pmt, eb, eh, em, v, bm1, bpn, along, xpl, ypl, sphi, cphi, diurab, eral, refa, refb] = IAU.apio13(utc1, utc2, dut1, elong, phi, hm, xp, yp, phpa, tc, rh, wl)
```

For a terrestrial observer, prepare star-independent astrometry
parameters for transformations between CIRS and observed
coordinates.  The caller supplies UTC, site coordinates, ambient air
conditions and observing wavelength.

## Given:
```
   utc1   double      UTC as a 2-part...
   utc2   double      ...quasi Julian Date (Notes 1,2)
   dut1   double      UT1-UTC (seconds)
   elong  double      longitude (radians, east +ve, Note 3)
   phi    double      geodetic latitude (radians, Note 3)
   hm     double      height above ellipsoid (m, geodetic Notes 4,6)
   xp,yp  double      polar motion coordinates (radians, Note 5)
   phpa   double      pressure at the observer (hPa = mB, Note 6)
   tc     double      ambient temperature at the observer (deg C)
   rh     double      relative humidity at the observer (range 0-1)
   wl     double      wavelength (micrometers, Note 7)
```

## Returned:
```
   astrom ASTROM*  star-independent astrometry parameters:
    pmt    double       unchanged
    eb     double[3]    unchanged
    eh     double[3]    unchanged
    em     double       unchanged
    v      double[3]    unchanged
    bm1    double       unchanged
    bpn    double[3][3] unchanged
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

## Returned (function value):
```
          int         status: +1 = dubious year (Note 2)
                               0 = OK
                              -1 = unacceptable date
```

## Notes:

1)  utc1+utc2 is quasi Julian Date (see Note 2), apportioned in any
    convenient way between the two arguments, for example where utc1
    is the Julian Day Number and utc2 is the fraction of a day.

    However, JD cannot unambiguously represent UTC during a leap
    second unless special measures are taken.  The convention in the
    present function is that the JD day represents UTC days whether
    the length is 86399, 86400 or 86401 SI seconds.

    Applications should use the function [iauDtf2d][1] to convert from
    calendar date and time of day into 2-part quasi Julian Date, as
    it implements the leap-second-ambiguity convention just
    described.

2)  The warning status "dubious year" flags UTCs that predate the
    introduction of the time scale or that are too far in the future
    to be trusted.  See [iauDat][2] for further details.

3)  UT1-UTC is tabulated in IERS bulletins.  It increases by exactly
    one second at the end of each positive UTC leap second,
    introduced in order to keep UT1-UTC within +/- 0.9s.  n.b. This
    practice is under review, and in the future UT1-UTC may grow
    essentially without limit.

4)  The geographical coordinates are with respect to the WGS84
    reference ellipsoid.  TAKE CARE WITH THE LONGITUDE SIGN:  the
    longitude required by the present function is east-positive
    (i.e. right-handed), in accordance with geographical convention.

5)  The polar motion xp,yp can be obtained from IERS bulletins.  The
    values are the coordinates (in radians) of the Celestial
    Intermediate Pole with respect to the International Terrestrial
    Reference System (see IERS Conventions 2003), measured along the
    meridians 0 and 90 deg west respectively.  For many applications,
    xp and yp can be set to zero.

    Internally, the polar motion is stored in a form rotated onto
    the local meridian.

6)  If hm, the height above the ellipsoid of the observing station
    in meters, is not known but phpa, the pressure in hPa (=mB), is
    available, an adequate estimate of hm can be obtained from the
    expression

          hm = -29.3 * tsl * log ( phpa / 1013.25 );

    where tsl is the approximate sea-level air temperature in K
    (See Astrophysical Quantities, C.W.Allen, 3rd edition, section
    52).  Similarly, if the pressure phpa is not known, it can be
    estimated from the height of the observing station, hm, as
    follows:

```
          phpa = 1013.25 * exp ( -hm / ( 29.3 * tsl ) );

    Note, however, that the refraction is nearly proportional to the
    pressure and that an accurate phpa value is important for
    precise work.
```

7)  The argument wl specifies the observing wavelength in
    micrometers.  The transition from optical to radio is assumed to
    occur at 100 micrometers (about 3000 GHz).

8)  It is advisable to take great care with units, as even unlikely
    values of the input parameters are accepted and processed in
    accordance with the models used.

9)  In cases where the caller wishes to supply his own Earth
    rotation information and refraction constants, the function
    Apc can be used instead of the present function.

10) This is one of several functions that inserts into the astrom
    structure star-independent parameters needed for the chain of
    astrometric transformations ICRS <-> GCRS <-> CIRS <-> observed.

    The various functions support different classes of observer and
    portions of the transformation chain:

```
        functions         observer        transformation

     iauApcg iauApcg13    geocentric      ICRS <-> GCRS
     iauApci iauApci13    terrestrial     ICRS <-> CIRS
     iauApco iauApco13    terrestrial     ICRS <-> observed
     iauApcs iauApcs13    space           ICRS <-> GCRS
     iauAper iauAper13    terrestrial     update Earth rotation
     iauApio iauApio13    terrestrial     CIRS <-> observed

    Those with names ending in "13" use contemporary SOFA models to
    compute the various ephemerides.  The others accept ephemerides
    supplied by the caller.

    The transformation from ICRS to GCRS covers space motion,
    parallax, light deflection, and aberration.  From GCRS to CIRS
    comprises frame bias and precession-nutation.  From CIRS to
    observed takes account of Earth rotation, polar motion, diurnal
    aberration and parallax (unless subsumed into the ICRS <-> GCRS
    transformation), and atmospheric refraction.
```

11) The context structure astrom produced by this function is used
    by [iauAtioq][15] and [iauAtoiq][16].

## Called:
```
   iauUtctai    UTC to TAI
   iauTaitt     TAI to TT
   iauUtcut1    UTC to UT1
   iauSp00      the TIO locator s', IERS 2000
   iauEra00     Earth rotation angle, IAU 2000
   iauRefco     refraction constants for given ambient conditions
   iauApio      astrometry parameters, CIRS-observed
```

This revision:   2013 October 9

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.

[1]: iau.dtf2d.md
[2]: iau.dat.md
[15]: iau.atioq.md
[16]: iau.atoiq.md
