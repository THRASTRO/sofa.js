# eraLtpecl

```js
vec = ERFA.ltpecl(epj)
```

Long-term precession of the ecliptic.

## Given:
```
   epj     double         Julian epoch (TT)
```

## Returned:
```
   vec     double[3]      ecliptic pole unit vector
```

## Notes:

1) The returned vector is with respect to the J2000.0 mean equator
   and equinox.

2) The Vondrak et al. (2011, 2012) 400 millennia precession model
   agrees with the IAU 2006 precession at J2000.0 and stays within
   100 microarcseconds during the 20th and 21st centuries.  It is
   accurate to a few arcseconds throughout the historical period,
   worsening to a few tenths of a degree at the end of the
   +/- 200,000 year time span.

## References:

  Vondrak, J., Capitaine, N. and Wallace, P., 2011, New precession
  expressions, valid for long time intervals, Astron.Astrophys. 534,
  A22

  Vondrak, J., Capitaine, N. and Wallace, P., 2012, New precession
  expressions, valid for long time intervals (Corrigendum),
  Astron.Astrophys. 541, C1

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
