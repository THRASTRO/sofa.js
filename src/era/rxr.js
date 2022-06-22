function eraRxr(a, b)
/*
**  - - - - - - -
**   e r a R x r
**  - - - - - - -
**
**  Multiply two r-matrices.
**
**  Given:
**     a        double[3][3]    first r-matrix
**     b        double[3][3]    second r-matrix
**
**  Returned:
**     atb      double[3][3]    a * b
**
**  Note:
**     It is permissible to re-use the same array for any of the
**     arguments.
**
**  Called:
**     eraCr        copy r-matrix
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var atb = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof atb == 'undefined') {
      atb = [ [0,0,0], [0,0,0], [0,0,0] ];
   }

   var i, j, k;
   var w, wm = [[], [], []];


   for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
         w = 0.0;
         for (k = 0; k < 3; k++) {
            w +=  a[i][k] * b[k][j];
         }
         wm[i][j] = w;
      }
   }
   atb = eraCr(wm);

/* Finished. */

return atb;
}