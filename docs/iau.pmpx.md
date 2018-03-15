# iauPmpx

```js
pco = IAU.pmpx(rc, dc, pr, pd, px, rv, pmt, pob)
```

Proper motion and parallax.
SOFA (Standards of Fundamental Astronomy) software collection.


## Given:
```
   rc,dc  double     ICRS RA,Dec at catalog epoch (radians)
   pr     double     RA proper motion (radians/year; Note 1)
   pd     double     Dec proper motion (radians/year)
   px     double     parallax (arcsec)
   rv     double     radial velocity (km/s, +ve if receding)
   pmt    double     proper motion time interval (SSB, Julian years)
   pob    double[3]  SSB to observer vector (au)
```

## Returned:
```
   pco    double[3]  coordinate direction (BCRS unit vector)
```

## Notes:

1) The proper motion in RA is dRA/dt rather than cos(Dec)*dRA/dt.

2) The proper motion time interval is for when the starlight
   reaches the solar system barycenter.

3) To avoid the need for iteration, the Roemer effect (i.e. the
   small annual modulation of the proper motion coming from the
   changing light time) is applied approximately, using the
   direction of the star at the catalog epoch.

## References:

   1984 Astronomical Almanac, pp B39-B41.

   Urban, S. & Seidelmann, P. K. (eds), Explanatory Supplement to
   the Astronomical Almanac, 3rd ed., University Science Books
   (2013), Section 7.2.

## Called:
```
   iauPdp       scalar product of two p-vectors
   iauPn        decompose p-vector into modulus and direction
```

This revision:   2013 October 9

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.