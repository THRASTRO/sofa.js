# eraFaur03

```js
rv = ERFA.faur03(t)
```

Fundamental argument, IERS Conventions (2003):
mean longitude of Uranus.

## Given:
```
   t     double    TDB, Julian centuries since J2000.0 (Note 1)
```

## Returned  (function value):
```
         double    mean longitude of Uranus, radians (Note 2)
```

## Notes:

1) Though t is strictly TDB, it is usually more convenient to use
   TT, which makes no significant difference.

2) The expression used is as adopted in IERS Conventions (2003) and
   is adapted from Simon et al. (1994).

## References:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

   Simon, J.-L., Bretagnon, P., Chapront, J., Chapront-Touze, M.,
   Francou, G., Laskar, J. 1994, Astron.Astrophys. 282, 663-683

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
