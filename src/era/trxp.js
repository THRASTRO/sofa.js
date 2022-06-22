function eraTrxp(r, p)
/*
**  - - - - - - - -
**   e r a T r x p
**  - - - - - - - -
**
**  Multiply a p-vector by the transpose of an r-matrix.
**
**  Given:
**     r        double[3][3]   r-matrix
**     p        double[3]      p-vector
**
**  Returned:
**     trp      double[3]      r^T * p
**
**  Note:
**     It is permissible for p and trp to be the same array.
**
**  Called:
**     eraTr        transpose r-matrix
**     eraRxp       product of r-matrix and p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var trp = [0, 0, 0];;


   var tr = [[], [], []];


/* Transpose of matrix r. */
   tr = eraTr(r);

/* Matrix tr * vector p -> vector trp. */
   trp = eraRxp(tr, p);

/* Finished. */

return trp;
}