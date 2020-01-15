# eraC2teqx

```js
rc2t = ERFA.c2teqx(rbpn, gst, rpom)
```

Assemble the celestial to terrestrial matrix from equinox-based
components (the celestial-to-true matrix, the Greenwich Apparent
Sidereal Time and the polar motion matrix).

## Given:
```
   rbpn   double[3][3]  celestial-to-true matrix
   gst    double        Greenwich (apparent) Sidereal Time (radians)
   rpom   double[3][3]  polar-motion matrix
```

## Returned:
```
   rc2t   double[3][3]  celestial-to-terrestrial matrix (Note 2)
```

## Notes:

1) This function constructs the rotation matrix that transforms
   vectors in the celestial system into vectors in the terrestrial
   system.  It does so starting from precomputed components, namely
   the matrix which rotates from celestial coordinates to the
   true equator and equinox of date, the Greenwich Apparent Sidereal
   Time and the polar motion matrix.  One use of the present function
   is when generating a series of celestial-to-terrestrial matrices
   where only the Sidereal Time changes, avoiding the considerable
   overhead of recomputing the precession-nutation more often than
   necessary to achieve given accuracy objectives.

## 2) The relationship between the arguments is as follows:

```
      [TRS] = rpom * R_3(gst) * rbpn * [CRS]

            = rc2t * [CRS]
```

   where [CRS] is a vector in the Geocentric Celestial Reference
   System and [TRS] is a vector in the International Terrestrial
   Reference System (see IERS Conventions 2003).

## Called:
```
   eraCr        copy r-matrix
   eraRz        rotate around Z-axis
   eraRxr       product of two r-matrices
```

## Reference:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
