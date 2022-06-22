function eraPv2p(pv)
/*
**  - - - - - - - -
**   e r a P v 2 p
**  - - - - - - - -
**
**  Discard velocity component of a pv-vector.
**
**  Given:
**     pv      double[2][3]     pv-vector
**
**  Returned:
**     p       double[3]        p-vector
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
   var p = [0, 0, 0];;


   p = eraCp(pv[0]);

/* Finished. */

return p;
}