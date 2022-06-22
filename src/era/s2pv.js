function eraS2pv(theta, phi, r, td, pd, rd)
/*
**  - - - - - - - -
**   e r a S 2 p v
**  - - - - - - - -
**
**  Convert position/velocity from spherical to Cartesian coordinates.
**
**  Given:
**     theta    double          longitude angle (radians)
**     phi      double          latitude angle (radians)
**     r        double          radial distance
**     td       double          rate of change of theta
**     pd       double          rate of change of phi
**     rd       double          rate of change of r
**
**  Returned:
**     pv       double[2][3]    pv-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var pv = [ [0,0,0], [0,0,0] ];;


   var st, ct, sp, cp, rcp, x, y, rpd, w;


   st = Math.sin(theta);
   ct = Math.cos(theta);
   sp = Math.sin(phi);
   cp = Math.cos(phi);
   rcp = r * cp;
   x = rcp * ct;
   y = rcp * st;
   rpd = r * pd;
   w = rpd*sp - cp*rd;

   pv[0][0] = x;
   pv[0][1] = y;
   pv[0][2] = r * sp;
   pv[1][0] = -y*td - w*ct;
   pv[1][1] =  x*td - w*st;
   pv[1][2] = rpd*cp + sp*rd;

/* Finished. */

return pv;
}