function eraPxp(a, b)
/*
**  - - - - - - -
**   e r a P x p
**  - - - - - - -
**
**  p-vector outer (=vector=cross) product.
**
**  Given:
**     a        double[3]      first p-vector
**     b        double[3]      second p-vector
**
**  Returned:
**     axb      double[3]      a x b
**
**  Note:
**     It is permissible to re-use the same array for any of the
**     arguments.
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var axb = [0, 0, 0];;


   var xa, ya, za, xb, yb, zb;


   xa = a[0];
   ya = a[1];
   za = a[2];
   xb = b[0];
   yb = b[1];
   zb = b[2];
   axb[0] = ya*zb - za*yb;
   axb[1] = za*xb - xa*zb;
   axb[2] = xa*yb - ya*xb;

/* Finished. */

return axb;
}