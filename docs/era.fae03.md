# eraFae03

```js
rv = ERFA.fae03(t)
```

Fundamental argument, IERS Conventions (2003):
mean longitude of Earth.

## Given:
```
   t     double    TDB, Julian centuries since J2000.0 (Note 1)
```

## Returned (function value):
```
         double    mean longitude of Earth, radians (Note 2)
```

## Notes:

1) Though t is strictly TDB, it is usually more convenient to use
   TT, which makes no significant difference.

2) The expression used is as adopted in IERS Conventions (2003) and
   comes from Souchay et al. (1999) after Simon et al. (1994).

## References:

   McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
   IERS Technical Note No. 32, BKG (2004)

   Simon, J.-L., Bretagnon, P., Chapront, J., Chapront-Touze, M.,
   Francou, G., Laskar, J. 1994, Astron.Astrophys. 282, 663-683

   Souchay, J., Loysel, B., Kinoshita, H., Folgueira, M. 1999,
   Astron.Astrophys.Supp.Ser. 135, 111

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
