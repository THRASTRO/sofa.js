function eraZp(p)
/*
**  - - - - - -
**   e r a Z p
**  - - - - - -
**
**  Zero a p-vector.
**
**  Returned:
**     p        double[3]      zero p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   if (typeof p == 'undefined') {
      p = [0, 0, 0];
   }

   p[0] = 0.0;
   p[1] = 0.0;
   p[2] = 0.0;

/* Finished. */

return p;
}