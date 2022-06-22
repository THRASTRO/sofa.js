function eraPvmpv(a, b)
/*
**  - - - - - - - - -
**   e r a P v m p v
**  - - - - - - - - -
**
**  Subtract one pv-vector from another.
**
**  Given:
**     a       double[2][3]      first pv-vector
**     b       double[2][3]      second pv-vector
**
**  Returned:
**     amb     double[2][3]      a - b
**
**  Note:
**     It is permissible to re-use the same array for any of the
**     arguments.
**
**  Called:
**     eraPmp       p-vector minus p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var amb = [ [0,0,0], [0,0,0] ];;


   amb[0] = eraPmp(a[0], b[0]);
   amb[1] = eraPmp(a[1], b[1]);

/* Finished. */

return amb;
}