# eraTpsts

```js
ERFA.tpsts(xi, eta, a0, b0)
```

In the tangent plane projection, given the star's rectangular
coordinates and the spherical coordinates of the tangent point,
solve for the spherical coordinates of the star.

## Given:
```
   xi,eta    double  rectangular coordinates of star image (Note 2)
   a0,b0     double  tangent point's spherical coordinates
```

## Returned:
```
   *a,*b     double  star's spherical coordinates
```

1) The tangent plane projection is also called the "gnomonic
   projection" and the "central projection".

2) The eta axis points due north in the adopted coordinate system.
   If the spherical coordinates are observed (RA,Dec), the tangent
   plane coordinates (xi,eta) are conventionally called the
   "standard coordinates".  If the spherical coordinates are with
   respect to a right-handed triad, (xi,eta) are also right-handed.
   The units of (xi,eta) are, effectively, radians at the tangent
   point.

3) All angular arguments are in radians.

## 4) This function is a member of the following set:

```
       spherical      vector         solve for

       eraTpxes      eraTpxev         xi,eta
     > eraTpsts <    eraTpstv          star
       eraTpors      eraTporv         origin
```

## Called:
```
   eraAnp       normalize angle into range 0 to 2pi
```

## References:

   Calabretta M.R. & Greisen, E.W., 2002, "Representations of
   celestial coordinates in FITS", Astron.Astrophys. 395, 1077

   Green, R.M., "Spherical Astronomy", Cambridge University Press,
   1987, Chapter 13.

This revision:   2018 January 2

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
