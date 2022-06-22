function eraSxp(s, p)
/*
**  - - - - - - -
**   e r a S x p
**  - - - - - - -
**
**  Multiply a p-vector by a scalar.
**
**  Given:
**     s      double        scalar
**     p      double[3]     p-vector
**
**  Returned:
**     sp     double[3]     s * p
**
**  Note:
**     It is permissible for p and sp to be the same array.
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var sp = [0, 0, 0];;


   sp[0] = s * p[0];
   sp[1] = s * p[1];
   sp[2] = s * p[2];

/* Finished. */

return sp;
}