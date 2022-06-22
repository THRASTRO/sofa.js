function eraTr(r)
/*
**  - - - - - -
**   e r a T r
**  - - - - - -
**
**  Transpose an r-matrix.
**
**  Given:
**     r        double[3][3]    r-matrix
**
**  Returned:
**     rt       double[3][3]    transpose
**
**  Note:
**     It is permissible for r and rt to be the same array.
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
   var rt = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof rt == 'undefined') {
      rt = [ [0,0,0], [0,0,0], [0,0,0] ];
   }

   var wm = [[], [], []];
   var i, j;


   for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
         wm[i][j] = r[j][i];
      }
   }
   rt = eraCr(wm);

/* Finished. */

return rt;
}