function eraZpv(pv)
/*
**  - - - - - - -
**   e r a Z p v
**  - - - - - - -
**
**  Zero a pv-vector.
**
**  Returned:
**     pv       double[2][3]      zero pv-vector
**
**  Called:
**     eraZp        zero p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   if (typeof pv == 'undefined') {
      pv = [ [0,0,0], [0,0,0] ];
   }

   pv[0] = eraZp(pv[0]);
   pv[1] = eraZp(pv[1]);

/* Finished. */

return pv;
}