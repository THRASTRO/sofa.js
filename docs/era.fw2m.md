# eraFw2m

```js
r = ERFA.fw2m(gamb, phib, psi, eps)
```

Form rotation matrix given the Fukushima-Williams angles.

## Given:
```
   gamb     double         F-W angle gamma_bar (radians)
   phib     double         F-W angle phi_bar (radians)
   psi      double         F-W angle psi (radians)
   eps      double         F-W angle epsilon (radians)
```

## Returned:
```
   r        double[3][3]   rotation matrix
```

## Notes:

## 1) Naming the following points:

```
         e = J2000.0 ecliptic pole,
         p = GCRS pole,
         E = ecliptic pole of date,
   and   P = CIP,
```

   the four Fukushima-Williams angles are as follows:

```
      gamb = gamma = epE
      phib = phi = pE
      psi = psi = pEP
      eps = epsilon = EP
```

2) The matrix representing the combined effects of frame bias,
   precession and nutation is:

```
      NxPxB = R_1(-eps).R_3(-psi).R_1(phib).R_3(gamb)
```

3) Three different matrices can be constructed, depending on the
   supplied angles:

```
   o  To obtain the nutation x precession x frame bias matrix,
      generate the four precession angles, generate the nutation
      components and add them to the psi_bar and epsilon_A angles,
      and call the present function.
```

   o  To obtain the precession x frame bias matrix, generate the
      four precession angles and call the present function.

   o  To obtain the frame bias matrix, generate the four precession
      angles for date J2000.0 and call the present function.

   The nutation-only and precession-only matrices can if necessary
   be obtained by combining these three appropriately.

## Called:
```
   eraIr        initialize r-matrix to identity
   eraRz        rotate around Z-axis
   eraRx        rotate around X-axis
```

## Reference:

   Hilton, J. et al., 2006, Celest.Mech.Dyn.Astron. 94, 351

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
