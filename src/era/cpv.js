function eraCpv(pv)
/*
**  - - - - - - -
**   e r a C p v
**  - - - - - - -
**
**  Copy a position/velocity vector.
**
**  Given:
**     pv     double[2][3]    position/velocity vector to be copied
**
**  Returned:
**     c      double[2][3]    copy
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
   var c = [ [0,0,0], [0,0,0] ];;


   c[0] = eraCp(pv[0]);
   c[1] = eraCp(pv[1]);

/* Finished. */

return c;
}