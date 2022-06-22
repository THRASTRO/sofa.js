function eraS2p(theta, phi, r)
/*
**  - - - - - - -
**   e r a S 2 p
**  - - - - - - -
**
**  Convert spherical polar coordinates to p-vector.
**
**  Given:
**     theta   double       longitude angle (radians)
**     phi     double       latitude angle (radians)
**     r       double       radial distance
**
**  Returned:
**     p       double[3]    Cartesian coordinates
**
**  Called:
**     eraS2c       spherical coordinates to unit vector
**     eraSxp       multiply p-vector by scalar
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var p = [0, 0, 0];;


   var u = [];


   u = eraS2c(theta, phi);
   p = eraSxp(r, u);

/* Finished. */

return p;
}