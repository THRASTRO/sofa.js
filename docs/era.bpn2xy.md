# eraBpn2xy

```js
[x, y] = ERFA.bpn2xy(rbpn)
```

Extract from the bias-precession-nutation matrix the X,Y coordinates
of the Celestial Intermediate Pole.

## Given:
```
   rbpn      double[3][3]  celestial-to-true matrix (Note 1)
```

## Returned:
```
   x,y       double        Celestial Intermediate Pole (Note 2)
```

## Notes:

1) The matrix rbpn transforms vectors from GCRS to true equator (and
   CIO or equinox) of date, and therefore the Celestial Intermediate
   Pole unit vector is the bottom row of the matrix.

2) The arguments x,y are components of the Celestial Intermediate
   Pole unit vector in the Geocentric Celestial Reference System.

## Reference:

   "Expressions for the Celestial Intermediate Pole and Celestial
   Ephemeris Origin consistent with the IAU 2000A precession-
   nutation model", Astron.Astrophys. 400, 1145-1154
   (2003)

   n.b. The celestial ephemeris origin (CEO) was renamed "celestial
        intermediate origin" (CIO) by IAU 2006 Resolution 2.

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
