# eraFk45z

```js
[r2000, d2000] = ERFA.fk45z(r1950, d1950, bepoch)
```

Convert a B1950.0 FK4 star position to J2000.0 FK5, assuming zero
proper motion in the FK5 system.

This function converts a star's catalog data from the old FK4
(Bessel-Newcomb) system to the later IAU 1976 FK5 (Fricke) system,
in such a way that the FK5 proper motion is zero.  Because such a
star has, in general, a non-zero proper motion in the FK4 system,
the routine requires the epoch at which the position in the FK4
system was determined.

## Given:
```
   r1950,d1950    double   B1950.0 FK4 RA,Dec at epoch (rad)
   bepoch         double   Besselian epoch (e.g. 1979.3D0)
```

## Returned:
```
   r2000,d2000    double   J2000.0 FK5 RA,Dec (rad)
```

## Notes:

1) The epoch bepoch is strictly speaking Besselian, but if a
   Julian epoch is supplied the result will be affected only to a
   negligible extent.

2) The method is from Appendix 2 of Aoki et al. (1983), but using
   the constants of Seidelmann (1992).  See the routine [eraFk425][1]
   for a general introduction to the FK4 to FK5 conversion.

3) Conversion from equinox B1950.0 FK4 to equinox J2000.0 FK5 only
   is provided for.  Conversions for different starting and/or
   ending epochs would require additional treatment for precession,
   proper motion and E-terms.

4) In the FK4 catalog the proper motions of stars within 10 degrees
   of the poles do not embody differential E-terms effects and
   should, strictly speaking, be handled in a different manner from
   stars outside these regions.  However, given the general lack of
   homogeneity of the star data available for routine astrometry,
   the difficulties of handling positions that may have been
   determined from astrometric fields spanning the polar and non-
   polar regions, the likelihood that the differential E-terms
   effect was not taken into account when allowing for proper motion
   in past astrometry, and the undesirability of a discontinuity in
   the algorithm, the decision has been made in this ERFA algorithm
   to include the effects of differential E-terms on the proper
   motions for all stars, whether polar or not.  At epoch 2000.0,
   and measuring "on the sky" rather than in terms of RA change, the
   errors resulting from this simplification are less than
   1 milliarcsecond in position and 1 milliarcsecond per century in
   proper motion.

## References:

   Aoki, S. et al., 1983, "Conversion matrix of epoch B1950.0
   FK4-based positions of stars to epoch J2000.0 positions in
   accordance with the new IAU resolutions".  Astron.Astrophys.
   128, 263-267.

   Seidelmann, P.K. (ed), 1992, "Explanatory Supplement to the
   Astronomical Almanac", ISBN 0-935702-68-7.

## Called:
```
   eraAnp       normalize angle into range 0 to 2pi
   eraC2s       p-vector to spherical
   eraEpb2jd    Besselian epoch to Julian date
   eraEpj       Julian date to Julian epoch
   eraPdp       scalar product of two p-vectors
   eraPmp       p-vector minus p-vector
   eraPpsp      p-vector plus scaled p-vector
   eraPvu       update a pv-vector
   eraS2c       spherical to p-vector
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.fk425.md
