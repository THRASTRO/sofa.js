function eraIr()
/*
**  - - - - - -
**   e r a I r
**  - - - - - -
**
**  Initialize an r-matrix to the identity matrix.
**
**  Returned:
**     r       double[3][3]    r-matrix
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var r = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof r == 'undefined') {
      r = [ [0,0,0], [0,0,0], [0,0,0] ];
   }

   r[0][0] = 1.0;
   r[0][1] = 0.0;
   r[0][2] = 0.0;
   r[1][0] = 0.0;
   r[1][1] = 1.0;
   r[1][2] = 0.0;
   r[2][0] = 0.0;
   r[2][1] = 0.0;
   r[2][2] = 1.0;

/* Finished. */

return r;
}