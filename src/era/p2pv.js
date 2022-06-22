function eraP2pv(p)
/*
**  - - - - - - - -
**   e r a P 2 p v
**  - - - - - - - -
**
**  Extend a p-vector to a pv-vector by appending a zero velocity.
**
**  Given:
**     p        double[3]       p-vector
**
**  Returned:
**     pv       double[2][3]    pv-vector
**
**  Called:
**     eraCp        copy p-vector
**     eraZp        zero p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var pv = [ [0,0,0], [0,0,0] ];;


   pv[0] = eraCp(p);
   pv[1] = eraZp(pv[1]);

/* Finished. */

return pv;
}