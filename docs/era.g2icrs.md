# eraG2icrs

```js
[dr, dd] = ERFA.g2icrs( dl, db)
```

Transformation from Galactic Coordinates to ICRS.

## Given:
```
   dl     double      galactic longitude (radians)
   db     double      galactic latitude (radians)
```

## Returned:
```
   dr     double      ICRS right ascension (radians)
   dd     double      ICRS declination (radians)
```

## Notes:

1) The IAU 1958 system of Galactic coordinates was defined with
   respect to the now obsolete reference system FK4 B1950.0.  When
   interpreting the system in a modern context, several factors have
   to be taken into account:

```
   . The inclusion in FK4 positions of the E-terms of aberration.
```

   . The distortion of the FK4 proper motion system by differential
     Galactic rotation.

   . The use of the B1950.0 equinox rather than the now-standard
     J2000.0.

   . The frame bias between ICRS and the J2000.0 mean place system.

   The Hipparcos Catalogue (Perryman & ESA 1997) provides a rotation
   matrix that transforms directly between ICRS and Galactic
   coordinates with the above factors taken into account.  The
   matrix is derived from three angles, namely the ICRS coordinates
   of the Galactic pole and the longitude of the ascending node of
   the galactic equator on the ICRS equator.  They are given in
   degrees to five decimal places and for canonical purposes are
   regarded as exact.  In the Hipparcos Catalogue the matrix
   elements are given to 10 decimal places (about 20 microarcsec).
   In the present ERFA function the matrix elements have been
   recomputed from the canonical three angles and are given to 30
   decimal places.

2) The inverse transformation is performed by the function [eraIcrs2g][1].

## Called:
```
   eraAnp       normalize angle into range 0 to 2pi
   eraAnpm      normalize angle into range +/- pi
   eraS2c       spherical coordinates to unit vector
   eraTrxp      product of transpose of r-matrix and p-vector
   eraC2s       p-vector to spherical
```

## Reference:
   Perryman M.A.C. & ESA, 1997, ESA SP-1200, The Hipparcos and Tycho
   catalogues.  Astrometric and photometric star catalogues
   derived from the ESA Hipparcos Space Astrometry Mission.  ESA
   Publications Division, Noordwijk, Netherlands.

This revision:   2021 January 25

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.icrs2g.md
