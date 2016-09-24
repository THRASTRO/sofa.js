# iauFane03

```js
rv = IAU.fane03(t)
```

Fundamental argument, IERS Conventions (2003):
mean longitude of Neptune.

## Given:
```
   t     double    TDB, Julian centuries since J2000.0 (Note 1)
```

## Returned (function value):
```
         double    mean longitude of Neptune, radians (Note 2)
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

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.