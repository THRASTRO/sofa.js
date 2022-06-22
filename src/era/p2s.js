function eraP2s(p)
/*
**  - - - - - - -
**   e r a P 2 s
**  - - - - - - -
**
**  P-vector to spherical polar coordinates.
**
**  Given:
**     p        double[3]    p-vector
**
**  Returned:
**     theta    double       longitude angle (radians)
**     phi      double       latitude angle (radians)
**     r        double       radial distance
**
**  Notes:
**
**  1) If P is null, zero theta, phi and r are returned.
**
**  2) At either pole, zero theta is returned.
**
**  Called:
**     eraC2s       p-vector to spherical
**     eraPm        modulus of p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var theta = 0.0;;
   var phi = 0.0;;
   var r = 0.0;;
   var _rv1;

   (_rv1 = eraC2s(p))[0];
   theta = _rv1[0];
   phi = _rv1[1];
   r = eraPm(p);

/* Finished. */

return [theta, phi, r];
}