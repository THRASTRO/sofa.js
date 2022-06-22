function eraRxpv(r, pv)
/*
**  - - - - - - - -
**   e r a R x p v
**  - - - - - - - -
**
**  Multiply a pv-vector by an r-matrix.
**
**  Given:
**     r        double[3][3]    r-matrix
**     pv       double[2][3]    pv-vector
**
**  Returned:
**     rpv      double[2][3]    r * pv
**
**  Notes:
**
**  1) The algorithm is for the simple case where the r-matrix r is not
**     a function of time.  The case where r is a function of time leads
**     to an additional velocity component equal to the product of the
**     derivative of r and the position vector.
**
**  2) It is permissible for pv and rpv to be the same array.
**
**  Called:
**     eraRxp       product of r-matrix and p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var rpv = [ [0,0,0], [0,0,0] ];;


   rpv[0] = eraRxp(r, pv[0]);
   rpv[1] = eraRxp(r, pv[1]);

/* Finished. */

return rpv;
}