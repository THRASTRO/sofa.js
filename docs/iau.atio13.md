# iauAtio13

```js
[rv, aob, zob, hob, dob, rob] = IAU.atio13(ri, di, utc1, utc2, dut1, elong, phi, hm, xp, yp, phpa, tc, rh, wl)
```

CIRS RA,Dec to observed place.  The caller supplies UTC, site
coordinates, ambient air conditions and observing wavelength.
SOFA (Standards of Fundamental Astronomy) software collection.


## Given:
```
   ri     double   CIRS right ascension (CIO-based, radians)
   di     double   CIRS declination (radians)
   utc1   double   UTC as a 2-part...
   utc2   double   ...quasi Julian Date (Notes 1,2)
   dut1   double   UT1-UTC (seconds, Note 3)
   elong  double   longitude (radians, east +ve, Note 4)
   phi    double   geodetic latitude (radians, Note 4)
   hm     double   height above ellipsoid (m, geodetic Notes 4,6)
   xp,yp  double   polar motion coordinates (radians, Note 5)
   phpa   double   pressure at the observer (hPa = mB, Note 6)
   tc     double   ambient temperature at the observer (deg C)
   rh     double   relative humidity at the observer (range 0-1)
   wl     double   wavelength (micrometers, Note 7)
```

## Returned:
```
   aob    double*  observed azimuth (radians: N=0,E=90)
   zob    double*  observed zenith distance (radians)
   hob    double*  observed hour angle (radians)
   dob    double*  observed declination (radians)
   rob    double*  observed right ascension (CIO-based, radians)
```

## Returned (function value):
```
          int      status: +1 = dubious year (Note 2)
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

    Applications should use the function iauDtf2d to convert from
    calendar date and time of day into 2-part quasi Julian Date, as
    it implements the leap-second-ambiguity convention just
    described.

2)  The warning status "dubious year" flags UTCs that predate the
    introduction of the time scale or that are too far in the
    future to be trusted.  See iauDat for further details.

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
    meridians 0 and 90 deg west respectively.  For many
    applications, xp and yp can be set to zero.

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

    Note, however, that the refraction is nearly proportional to
    the pressure and that an accurate phpa value is important for
    precise work.
```

7)  The argument wl specifies the observing wavelength in
    micrometers.  The transition from optical to radio is assumed to
    occur at 100 micrometers (about 3000 GHz).

8)  "Observed" Az,ZD means the position that would be seen by a
    perfect geodetically aligned theodolite.  (Zenith distance is
    used rather than altitude in order to reflect the fact that no
    allowance is made for depression of the horizon.)  This is
    related to the observed HA,Dec via the standard rotation, using
    the geodetic latitude (corrected for polar motion), while the
    observed HA and RA are related simply through the Earth rotation
    angle and the site longitude.  "Observed" RA,Dec or HA,Dec thus
    means the position that would be seen by a perfect equatorial
    with its polar axis aligned to the Earth's axis of rotation.

9)  The accuracy of the result is limited by the corrections for
    refraction, which use a simple A*tan(z) + B*tan^3(z) model.
    Providing the meteorological parameters are known accurately and
    there are no gross local effects, the predicted astrometric
    coordinates should be within 0.05 arcsec (optical) or 1 arcsec
    (radio) for a zenith distance of less than 70 degrees, better
    than 30 arcsec (optical or radio) at 85 degrees and better
    than 20 arcmin (optical) or 30 arcmin (radio) at the horizon.

10) The complementary functions iauAtio13 and iauAtoi13 are self-
    consistent to better than 1 microarcsecond all over the
    celestial sphere.

11) It is advisable to take great care with units, as even unlikely
    values of the input parameters are accepted and processed in
    accordance with the models used.

## Called:
```
   iauApio13    astrometry parameters, CIRS-observed, 2013
   iauAtioq     quick CIRS to observed
```

This revision:   2016 February 2 

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.