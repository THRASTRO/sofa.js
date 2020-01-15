# eraTpxev

```js
rv = ERFA.tpxev(v, v0)
```

In the tangent plane projection, given celestial direction cosines
for a star and the tangent point, solve for the star's rectangular
coordinates in the tangent plane.

## Given:
```
   v         double[3]  direction cosines of star (Note 4)
   v0        double[3]  direction cosines of tangent point (Note 4)
```

## Returned:
```
   *xi,*eta  double     tangent plane coordinates of star
```

## Returned (function value):
```
             int        status: 0 = OK
                                1 = star too far from axis
                                2 = antistar on tangent plane
                                3 = antistar too far from axis
```

## Notes:

1) The tangent plane projection is also called the "gnomonic
   projection" and the "central projection".

2) The eta axis points due north in the adopted coordinate system.
   If the direction cosines represent observed (RA,Dec), the tangent
   plane coordinates (xi,eta) are conventionally called the
   "standard coordinates".  If the direction cosines are with
   respect to a right-handed triad, (xi,eta) are also right-handed.
   The units of (xi,eta) are, effectively, radians at the tangent
   point.

3) The method used is to extend the star vector to the tangent
   plane and then rotate the triad so that (x,y) becomes (xi,eta).
   Writing (a,b) for the celestial spherical coordinates of the
   star, the sequence of rotations is (a+pi/2) around the z-axis
   followed by (pi/2-b) around the x-axis.

4) If vector v0 is not of unit length, or if vector v is of zero
   length, the results will be wrong.

5) If v0 points at a pole, the returned (xi,eta) will be based on
   the arbitrary assumption that the longitude coordinate of the
   tangent point is zero.

## 6) This function is a member of the following set:

```
       spherical      vector         solve for

       eraTpxes    > eraTpxev <       xi,eta
       eraTpsts      eraTpstv          star
       eraTpors      eraTporv         origin
```

## References:

   Calabretta M.R. & Greisen, E.W., 2002, "Representations of
   celestial coordinates in FITS", Astron.Astrophys. 395, 1077

   Green, R.M., "Spherical Astronomy", Cambridge University Press,
   1987, Chapter 13.

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
