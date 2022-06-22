function eraC2s(p)
/*
**  - - - - - - -
**   e r a C 2 s
**  - - - - - - -
**
**  P-vector to spherical coordinates.
**
**  Given:
**     p      double[3]    p-vector
**
**  Returned:
**     theta  double       longitude angle (radians)
**     phi    double       latitude angle (radians)
**
**  Notes:
**
**  1) The vector p can have any magnitude; only its direction is used.
**
**  2) If p is null, zero theta and phi are returned.
**
**  3) At either pole, zero theta is returned.
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var theta = 0.0;;
   var phi = 0.0;;


   var x, y, z, d2;


   x  = p[0];
   y  = p[1];
   z  = p[2];
   d2 = x*x + y*y;

   theta = (d2 == 0.0) ? 0.0 : Math.atan2(y, x);
   phi = (z == 0.0) ? 0.0 : Math.atan2(z, Math.sqrt(d2));

/* Finished. */

return [theta, phi];
}