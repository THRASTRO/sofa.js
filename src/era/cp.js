function eraCp(p)
/*
**  - - - - - -
**   e r a C p
**  - - - - - -
**
**  Copy a p-vector.
**
**  Given:
**     p        double[3]     p-vector to be copied
**
**  Returned:
**     c        double[3]     copy
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var c = [0, 0, 0];;


   c[0] = p[0];
   c[1] = p[1];
   c[2] = p[2];

/* Finished. */

return c;
}