function eraRv2m(w, r)
/*
**  - - - - - - - -
**   e r a R v 2 m
**  - - - - - - - -
**
**  Form the r-matrix corresponding to a given r-vector.
**
**  Given:
**     w        double[3]      rotation vector (Note 1)
**
**  Returned:
**     r        double[3][3]    rotation matrix
**
**  Notes:
**
**  1) A rotation matrix describes a rotation through some angle about
**     some arbitrary axis called the Euler axis.  The "rotation vector"
**     supplied to This function has the same direction as the Euler
**     axis, and its magnitude is the angle in radians.
**
**  2) If w is null, the identity matrix is returned.
**
**  3) The reference frame rotates clockwise as seen looking along the
**     rotation vector from the origin.
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   if (typeof r == 'undefined') {
      r = [ [0,0,0], [0,0,0], [0,0,0] ];
   }

   var x, y, z, phi, s, c, f;


/* Euler angle (magnitude of rotation vector) and functions. */
   x = w[0];
   y = w[1];
   z = w[2];
   phi = Math.sqrt(x*x + y*y + z*z);
   s = Math.sin(phi);
   c = Math.cos(phi);
   f = 1.0 - c;

/* Euler axis (direction of rotation vector), perhaps null. */
   if (phi > 0.0) {
       x /= phi;
       y /= phi;
       z /= phi;
   }

/* Form the rotation matrix. */
   r[0][0] = x*x*f + c;
   r[0][1] = x*y*f + z*s;
   r[0][2] = x*z*f - y*s;
   r[1][0] = y*x*f - z*s;
   r[1][1] = y*y*f + c;
   r[1][2] = y*z*f + x*s;
   r[2][0] = z*x*f + y*s;
   r[2][1] = z*y*f - x*s;
   r[2][2] = z*z*f + c;

/* Finished. */

return r;
}