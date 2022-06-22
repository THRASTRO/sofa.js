function eraC2ixys(x, y, s)
/*
**  - - - - - - - - - -
**   e r a C 2 i x y s
**  - - - - - - - - - -
**
**  Form the celestial to intermediate-frame-of-date matrix given the CIP
**  X,Y and the CIO locator s.
**
**  Given:
**     x,y      double         Celestial Intermediate Pole (Note 1)
**     s        double         the CIO locator s (Note 2)
**
**  Returned:
**     rc2i     double[3][3]   celestial-to-intermediate matrix (Note 3)
**
**  Notes:
**
**  1) The Celestial Intermediate Pole coordinates are the x,y
**     components of the unit vector in the Geocentric Celestial
**     Reference System.
**
**  2) The CIO locator s (in radians) positions the Celestial
**     Intermediate Origin on the equator of the CIP.
**
**  3) The matrix rc2i is the first stage in the transformation from
**     celestial to terrestrial coordinates:
**
**        [TRS] = RPOM * R_3(ERA) * rc2i * [CRS]
**
**              = RC2T * [CRS]
**
**     where [CRS] is a vector in the Geocentric Celestial Reference
**     System and [TRS] is a vector in the International Terrestrial
**     Reference System (see IERS Conventions 2003), ERA is the Earth
**     Rotation Angle and RPOM is the polar motion matrix.
**
**  Called:
**     eraIr        initialize r-matrix to identity
**     eraRz        rotate around Z-axis
**     eraRy        rotate around Y-axis
**
**  Reference:
**
**     McCarthy, D. D., Petit, G. (eds.), IERS Conventions (2003),
**     IERS Technical Note No. 32, BKG (2004)
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var rc2i = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof rc2i == 'undefined') {
      rc2i = [ [0,0,0], [0,0,0], [0,0,0] ];
   }

   var r2, e, d;


/* Obtain the spherical angles E and d. */
   r2 = x*x + y*y;
   e = (r2 > 0.0) ? Math.atan2(y, x) : 0.0;
   d = Math.atan(Math.sqrt(r2 / (1.0 - r2)));

/* Form the matrix. */
   rc2i = eraIr();
   rc2i = eraRz(e, rc2i);
   rc2i = eraRy(d, rc2i);
   rc2i = eraRz(-(e+s), rc2i);

/* Finished. */

return rc2i;
}