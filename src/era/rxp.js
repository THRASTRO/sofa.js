function eraRxp(r, p)
/*
**  - - - - - - -
**   e r a R x p
**  - - - - - - -
**
**  Multiply a p-vector by an r-matrix.
**
**  Given:
**     r        double[3][3]    r-matrix
**     p        double[3]       p-vector
**
**  Returned:
**     rp       double[3]       r * p
**
**  Note:
**     It is permissible for p and rp to be the same array.
**
**  Called:
**     eraCp        copy p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var rp = [0, 0, 0];;


   var w, wrp = [];
   var i, j;


/* Matrix r * vector p. */
   for (j = 0; j < 3; j++) {
       w = 0.0;
       for (i = 0; i < 3; i++) {
           w += r[j][i] * p[i];
       }
       wrp[j] = w;
   }

/* Return the result. */
   rp = eraCp(wrp);

/* Finished. */

return rp;
}