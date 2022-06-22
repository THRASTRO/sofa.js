function eraS2xpv(s1, s2, pv)
/*
**  - - - - - - - - -
**   e r a S 2 x p v
**  - - - - - - - - -
**
**  Multiply a pv-vector by two scalars.
**
**  Given:
**     s1     double         scalar to multiply position component by
**     s2     double         scalar to multiply velocity component by
**     pv     double[2][3]   pv-vector
**
**  Returned:
**     spv    double[2][3]   pv-vector: p scaled by s1, v scaled by s2
**
**  Note:
**     It is permissible for pv and spv to be the same array.
**
**  Called:
**     eraSxp       multiply p-vector by scalar
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var spv = [ [0,0,0], [0,0,0] ];;


   spv[0] = eraSxp(s1, pv[0]);
   spv[1] = eraSxp(s2, pv[1]);

/* Finished. */

return spv;
}