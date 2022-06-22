# eraTpors

```js
rv = ERFA.tpors(xi, eta, a, b)
```

In the tangent plane projection, given the rectangular coordinates
of a star and its spherical coordinates, determine the spherical
coordinates of the tangent point.

## Given:
```
   xi,eta     double  rectangular coordinates of star image (Note 2)
   a,b        double  star's spherical coordinates (Note 3)
```

## Returned:
```
   *a01,*b01  double  tangent point's spherical coordinates, Soln. 1
   *a02,*b02  double  tangent point's spherical coordinates, Soln. 2
```

## Returned (function value):
```
              int     number of solutions:
                      0 = no solutions returned (Note 5)
                      1 = only the first solution is useful (Note 6)
                      2 = both solutions are useful (Note 6)
```

## Notes:

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

4) The angles a01 and a02 are returned in the range 0-2pi.  The
   angles b01 and b02 are returned in the range +/-pi, but in the
   usual, non-pole-crossing, case, the range is +/-pi/2.

5) Cases where there is no solution can arise only near the poles.
   For example, it is clearly impossible for a star at the pole
   itself to have a non-zero xi value, and hence it is meaningless
   to ask where the tangent point would have to be to bring about
   this combination of xi and dec.

6) Also near the poles, cases can arise where there are two useful
   solutions.  The return value indicates whether the second of the
   two solutions returned is useful;  1 indicates only one useful
   solution, the usual case.

7) The basis of the algorithm is to solve the spherical triangle PSC,
   where P is the north celestial pole, S is the star and C is the
   tangent point.  The spherical coordinates of the tangent point are
   [a0,b0];  writing rho^2 = (xi^2+eta^2) and r^2 = (1+rho^2), side c
   is then (pi/2-b), side p is sqrt(xi^2+eta^2) and side s (to be
   found) is (pi/2-b0).  Angle C is given by sin(C) = xi/rho and
   cos(C) = eta/rho.  Angle P (to be found) is the longitude
   difference between star and tangent point (a-a0).

## 8) This function is a member of the following set:

```
       spherical      vector         solve for

       eraTpxes      eraTpxev         xi,eta
       eraTpsts      eraTpstv          star
     > eraTpors <    eraTporv         origin
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
