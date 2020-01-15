# eraEors

```js
rv = ERFA.eors(rnpb, s)
```

Equation of the origins, given the classical NPB matrix and the
quantity s.

## Given:
```
   rnpb  double[3][3]  classical nutation x precession x bias matrix
   s     double        the quantity s (the CIO locator)
```

## Returned (function value):
```
         double        the equation of the origins in radians.
```

## Notes:

1)  The equation of the origins is the distance between the true
    equinox and the celestial intermediate origin and, equivalently,
    the difference between Earth rotation angle and Greenwich
    apparent sidereal time (ERA-GST).  It comprises the precession
    (since J2000.0) in right ascension plus the equation of the
    equinoxes (including the small correction terms).

2)  The algorithm is from Wallace & Capitaine (2006).

## References:

   Capitaine, N. & Wallace, P.T., 2006, Astron.Astrophys. 450, 855

   Wallace, P. & Capitaine, N., 2006, Astron.Astrophys. 459, 981

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
