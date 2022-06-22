function eraPvppv(a, b)
/*
**  - - - - - - - - -
**   e r a P v p p v
**  - - - - - - - - -
**
**  Add one pv-vector to another.
**
**  Given:
**     a        double[2][3]      first pv-vector
**     b        double[2][3]      second pv-vector
**
**  Returned:
**     apb      double[2][3]      a + b
**
**  Note:
**     It is permissible to re-use the same array for any of the
**     arguments.
**
**  Called:
**     eraPpp       p-vector plus p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var apb = [ [0,0,0], [0,0,0] ];;


   apb[0] = eraPpp(a[0], b[0]);
   apb[1] = eraPpp(a[1], b[1]);

/* Finished. */

return apb;
}