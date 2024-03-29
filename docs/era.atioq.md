# eraAtioq

```js
[aob, zob, hob, dob, rob] = ERFA.atioq(ri, di, astrom)
```

Quick CIRS to observed place transformation.

Use of this function is appropriate when efficiency is important and
where many star positions are all to be transformed for one date.
The star-independent astrometry parameters can be obtained by
calling [eraApio][1] or [eraApco][2].

## Given:
```
   ri     double     CIRS right ascension
   di     double     CIRS declination
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
   aob    double*    observed azimuth (radians: N=0,E=90)
   zob    double*    observed zenith distance (radians)
   hob    double*    observed hour angle (radians)
   dob    double*    observed declination (radians)
   rob    double*    observed right ascension (CIO-based, radians)
```

## Notes:

1) This function returns zenith distance rather than altitude in
   order to reflect the fact that no allowance is made for
   depression of the horizon.

2) The accuracy of the result is limited by the corrections for
   refraction, which use a simple A*tan(z) + B*tan^3(z) model.
   Providing the meteorological parameters are known accurately and
   there are no gross local effects, the predicted observed
   coordinates should be within 0.05 arcsec (optical) or 1 arcsec
   (radio) for a zenith distance of less than 70 degrees, better
   than 30 arcsec (optical or radio) at 85 degrees and better
   than 20 arcmin (optical) or 30 arcmin (radio) at the horizon.

   Without refraction, the complementary functions [eraAtioq][3] and
   [eraAtoiq][4] are self-consistent to better than 1 microarcsecond all
   over the celestial sphere.  With refraction included, consistency
   falls off at high zenith distances, but is still better than
   0.05 arcsec at 85 degrees.

3) It is advisable to take great care with units, as even unlikely
   values of the input parameters are accepted and processed in
   accordance with the models used.

4) The CIRS RA,Dec is obtained from a star catalog mean place by
   allowing for space motion, parallax, the Sun's gravitational lens
   effect, annual aberration and precession-nutation.  For star
   positions in the ICRS, these effects can be applied by means of
   the [eraAtci13][5] (etc.) functions.  Starting from classical "mean
   place" systems, additional transformations will be needed first.

5) "Observed" Az,El means the position that would be seen by a
   perfect geodetically aligned theodolite.  This is obtained from
   the CIRS RA,Dec by allowing for Earth orientation and diurnal
   aberration, rotating from equator to horizon coordinates, and
   then adjusting for refraction.  The HA,Dec is obtained by
   rotating back into equatorial coordinates, and is the position
   that would be seen by a perfect equatorial with its polar axis
   aligned to the Earth's axis of rotation.  Finally, the RA is
   obtained by subtracting the HA from the local ERA.

6) The star-independent CIRS-to-observed-place parameters in ASTROM
   may be computed with [eraApio][1] or [eraApco][2].  If nothing has
   changed significantly except the time, [eraAper][6] may be used to
   perform the requisite adjustment to the astrom structure.

## Called:
```
   eraS2c       spherical coordinates to unit vector
   eraC2s       p-vector to spherical
   eraAnp       normalize angle into range 0 to 2pi
```

This revision:   2020 December 7

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.apio.md
[2]: era.apco.md
[3]: era.atioq.md
[4]: era.atoiq.md
[5]: era.atci13.md
[6]: era.aper.md
