# eraAb

```js
ERFA.ab(pnat, v, s, bm1)
```

Apply aberration to transform natural direction into proper
direction.

## Given:
  pnat    double[3]   natural direction to the source (unit vector)
  v       double[3]   observer barycentric velocity in units of c
  s       double      distance between the Sun and the observer (au)
  bm1     double      sqrt(1-|v|^2): reciprocal of Lorenz factor

## Returned:
  ppr     double[3]   proper direction to source (unit vector)

## Notes:

1) The algorithm is based on Expr. (7.40) in the Explanatory
   Supplement (Urban & Seidelmann 2013), but with the following
   changes:

```
   o  Rigorous rather than approximate normalization is applied.
```

   o  The gravitational potential term from Expr. (7) in
      Klioner (2003) is added, taking into account only the Sun's
      contribution.  This has a maximum effect of about
      0.4 microarcsecond.

2) In almost all cases, the maximum accuracy will be limited by the
   supplied velocity.  For example, if the ERFA [eraEpv00][1] function is
   used, errors of up to 5 microarcseconds could occur.

## References:

   Urban, S. & Seidelmann, P. K. (eds), Explanatory Supplement to
   the Astronomical Almanac, 3rd ed., University Science Books
   (2013).

   Klioner, Sergei A., "A practical relativistic model for micro-
   arcsecond astrometry in space", Astr. J. 125, 1580-1597 (2003).

## Called:
```
   eraPdp       scalar product of two p-vectors
```

This revision:   2021 February 24

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.epv00.md
