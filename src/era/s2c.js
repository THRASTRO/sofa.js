function eraS2c(theta, phi)
/*
**  - - - - - - -
**   e r a S 2 c
**  - - - - - - -
**
**  Convert spherical coordinates to Cartesian.
**
**  Given:
**     theta    double       longitude angle (radians)
**     phi      double       latitude angle (radians)
**
**  Returned:
**     c        double[3]    direction cosines
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var c = [0, 0, 0];;


   var cp;


   cp = Math.cos(phi);
   c[0] = Math.cos(theta) * cp;
   c[1] = Math.sin(theta) * cp;
   c[2] = Math.sin(phi);

/* Finished. */

return c;
}