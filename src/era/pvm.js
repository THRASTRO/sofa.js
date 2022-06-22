function eraPvm(pv)
/*
**  - - - - - - -
**   e r a P v m
**  - - - - - - -
**
**  Modulus of pv-vector.
**
**  Given:
**     pv     double[2][3]   pv-vector
**
**  Returned:
**     r      double         modulus of position component
**     s      double         modulus of velocity component
**
**  Called:
**     eraPm        modulus of p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var r = 0.0;;
   var s = 0.0;;


/* Distance. */
   r = eraPm(pv[0]);

/* Speed. */
   s = eraPm(pv[1]);

/* Finished. */

return [r, s];
}