# eraBi00

```js
[dpsibi, depsbi, dra] = ERFA.bi00()
```

Frame bias components of IAU 2000 precession-nutation models (part
of MHB2000 with additions).

## Returned:
```
   dpsibi,depsbi  double  longitude and obliquity corrections
   dra            double  the ICRS RA of the J2000.0 mean equinox
```

## Notes:

1) The frame bias corrections in longitude and obliquity (radians)
   are required in order to correct for the offset between the GCRS
   pole and the mean J2000.0 pole.  They define, with respect to the
   GCRS frame, a J2000.0 mean pole that is consistent with the rest
   of the IAU 2000A precession-nutation model.

2) In addition to the displacement of the pole, the complete
   description of the frame bias requires also an offset in right
   ascension.  This is not part of the IAU 2000A model, and is from
   Chapront et al. (2002).  It is returned in radians.

3) This is a supplemented implementation of one aspect of the IAU
   2000A nutation model, formally adopted by the IAU General
   Assembly in 2000, namely MHB2000 (Mathews et al. 2002).

## References:

   Chapront, J., Chapront-Touze, M. & Francou, G., Astron.
   Astrophys., 387, 700, 2002.

   Mathews, P.M., Herring, T.A., Buffet, B.A., "Modeling of nutation
   and precession   New nutation series for nonrigid Earth and
   insights into the Earth's interior", J.Geophys.Res., 107, B4,
   2002.  The MHB2000 code itself was obtained on 9th September 2002
   from ftp://maia.usno.navy.mil/conv2000/chapter5/IAU2000A.

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
