function eraCr(r)
/*
**  - - - - - -
**   e r a C r
**  - - - - - -
**
**  Copy an r-matrix.
**
**  Given:
**     r        double[3][3]    r-matrix to be copied
**
**  Returned:
**     c        double[3][3]    copy
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
   var c = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof c == 'undefined') {
      c = [ [0,0,0], [0,0,0], [0,0,0] ];
   }

   c[0] = eraCp(r[0]);
   c[1] = eraCp(r[1]);
   c[2] = eraCp(r[2]);

/* Finished. */

return c;
}