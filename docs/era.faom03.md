# eraFaom03

```js
rv = ERFA.faom03(t)
```

Fundamental argument, IERS Conventions (2003):
mean longitude of the Moon's ascending node.

## Given:
```
   t     double    TDB, Julian centuries since J2000.0 (Note 1)
```

## Returned (function value):
```
         double    Omega, radians (Note 2)
```

## Notes:

1) Though t is strictly TDB, it is usually more convenient to use
   TT, which makes no significant difference.

2) The expression used is as adopted in IERS Conventions (2003) and
   is from Simon et al. (1994).

## References:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

   Simon, J.-L., Bretagnon, P., Chapront, J., Chapront-Touze, M.,
   Francou, G., Laskar, J., 1994, Astron.Astrophys. 282, 663-683.

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
