function eraPmp(a, b)
/*
**  - - - - - - -
**   e r a P m p
**  - - - - - - -
**
**  P-vector subtraction.
**
**  Given:
**     a        double[3]      first p-vector
**     b        double[3]      second p-vector
**
**  Returned:
**     amb      double[3]      a - b
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
   var amb = [0, 0, 0];;


   amb[0] = a[0] - b[0];
   amb[1] = a[1] - b[1];
   amb[2] = a[2] - b[2];

/* Finished. */

return amb;
}