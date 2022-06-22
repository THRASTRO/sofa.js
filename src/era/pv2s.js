function eraPv2s(pv)
/*
**  - - - - - - - -
**   e r a P v 2 s
**  - - - - - - - -
**
**  Convert position/velocity from Cartesian to spherical coordinates.
**
**  Given:
**     pv       double[2][3]  pv-vector
**
**  Returned:
**     theta    double        longitude angle (radians)
**     phi      double        latitude angle (radians)
**     r        double        radial distance
**     td       double        rate of change of theta
**     pd       double        rate of change of phi
**     rd       double        rate of change of r
**
**  Notes:
**
**  1) If the position part of pv is null, theta, phi, td and pd
**     are indeterminate.  This is handled by extrapolating the
**     position through unit time by using the velocity part of
**     pv.  This moves the origin without changing the direction
**     of the velocity component.  If the position and velocity
**     components of pv are both null, zeroes are returned for all
**     six results.
**
**  2) If the position is a pole, theta, td and pd are indeterminate.
**     In such cases zeroes are returned for all three.
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
   var td = 0.0;;
   var pd = 0.0;;
   var rd = 0.0;;


   var x, y, z, xd, yd, zd, rxy2, rxy, r2, rtrue, rw, xyp;


/* Components of position/velocity vector. */
   x  = pv[0][0];
   y  = pv[0][1];
   z  = pv[0][2];
   xd = pv[1][0];
   yd = pv[1][1];
   zd = pv[1][2];

/* Component of r in XY plane squared. */
   rxy2 = x*x + y*y;

/* Modulus squared. */
   r2 = rxy2 + z*z;

/* Modulus. */
   rtrue = Math.sqrt(r2);

/* If null vector, move the origin along the direction of movement. */
   rw = rtrue;
   if (rtrue == 0.0) {
       x = xd;
       y = yd;
       z = zd;
       rxy2 = x*x + y*y;
       r2 = rxy2 + z*z;
       rw = Math.sqrt(r2);
   }

/* Position and velocity in spherical coordinates. */
   rxy = Math.sqrt(rxy2);
   xyp = x*xd + y*yd;
   if (rxy2 != 0.0) {
       theta = Math.atan2(y, x);
       phi = Math.atan2(z, rxy);
       td = (x*yd - y*xd) / rxy2;
       pd = (zd*rxy2 - z*xyp) / (r2*rxy);
   } else {
       theta = 0.0;
       phi = (z != 0.0) ? Math.atan2(z, rxy) : 0.0;
       td = 0.0;
       pd = 0.0;
   }
   r = rtrue;
   rd = (rw != 0.0) ? (xyp + z*zd) / rw : 0.0;

/* Finished. */

return [theta, phi, r, td, pd, rd];
}