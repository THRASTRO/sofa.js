# eraFk52h

```js
[rh, dh, drh, ddh, pxh, rvh] = ERFA.fk52h(r5, d5, dr5, dd5, px5, rv5)
```

Transform FK5 (J2000.0) star data into the Hipparcos system.

Given (all FK5, equinox J2000.0, epoch J2000.0):
```
   r5      double    RA (radians)
   d5      double    Dec (radians)
   dr5     double    proper motion in RA (dRA/dt, rad/Jyear)
   dd5     double    proper motion in Dec (dDec/dt, rad/Jyear)
   px5     double    parallax (arcsec)
   rv5     double    radial velocity (km/s, positive = receding)
```

Returned (all Hipparcos, epoch J2000.0):
```
   rh      double    RA (radians)
   dh      double    Dec (radians)
   drh     double    proper motion in RA (dRA/dt, rad/Jyear)
   ddh     double    proper motion in Dec (dDec/dt, rad/Jyear)
   pxh     double    parallax (arcsec)
   rvh     double    radial velocity (km/s, positive = receding)
```

## Notes:

1) This function transforms FK5 star positions and proper motions
   into the system of the Hipparcos catalog.

2) The proper motions in RA are dRA/dt rather than
   cos(Dec)*dRA/dt, and are per year rather than per century.

3) The FK5 to Hipparcos transformation is modeled as a pure
   rotation and spin;  zonal errors in the FK5 catalog are not
   taken into account.

4) See also [eraH2fk5][1], [eraFk5hz][2], [eraHfk5z][3].

## Called:
```
   eraStarpv    star catalog data to space motion pv-vector
   eraFk5hip    FK5 to Hipparcos rotation and spin
   eraRxp       product of r-matrix and p-vector
   eraPxp       vector product of two p-vectors
   eraPpp       p-vector plus p-vector
   eraPvstar    space motion pv-vector to star catalog data
```

## Reference:

   F.Mignard & M.Froeschle, Astron.Astrophys., 354, 732-739 (2000).

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.h2fk5.md
[2]: era.fk5hz.md
[3]: era.hfk5z.md
