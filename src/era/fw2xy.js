function eraFw2xy(gamb, phib, psi, eps)
/*
**  - - - - - - - - -
**   e r a F w 2 x y
**  - - - - - - - - -
**
**  CIP X,Y given Fukushima-Williams bias-precession-nutation angles.
**
**  Given:
**     gamb     double    F-W angle gamma_bar (radians)
**     phib     double    F-W angle phi_bar (radians)
**     psi      double    F-W angle psi (radians)
**     eps      double    F-W angle epsilon (radians)
**
**  Returned:
**     x,y      double    CIP unit vector X,Y
**
**  Notes:
**
**  1) Naming the following points:
**
**           e = J2000.0 ecliptic pole,
**           p = GCRS pole
**           E = ecliptic pole of date,
**     and   P = CIP,
**
**     the four Fukushima-Williams angles are as follows:
**
**        gamb = gamma = epE
**        phib = phi = pE
**        psi = psi = pEP
**        eps = epsilon = EP
**
**  2) The matrix representing the combined effects of frame bias,
**     precession and nutation is:
**
**        NxPxB = R_1(-epsA).R_3(-psi).R_1(phib).R_3(gamb)
**
**     The returned values x,y are elements [2][0] and [2][1] of the
**     matrix.  Near J2000.0, they are essentially angles in radians.
**
**  Called:
**     eraFw2m      F-W angles to r-matrix
**     eraBpn2xy    extract CIP X,Y coordinates from NPB matrix
**
**  Reference:
**
**     Hilton, J. et al., 2006, Celest.Mech.Dyn.Astron. 94, 351
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var x = 0.0;;
   var y = 0.0;;
   var _rv2;

   var r = [[], [], []];


/* Form NxPxB matrix. */
   r = eraFw2m(gamb, phib, psi, eps);

/* Extract CIP X,Y. */
   (_rv2 = eraBpn2xy(r))[0];
   x = _rv2[0];
   y = _rv2[1];

/* Finished. */

return [x, y];
}