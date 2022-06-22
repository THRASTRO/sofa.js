function eraPpsp(a, s, b)
/*
**  - - - - - - - -
**   e r a P p s p
**  - - - - - - - -
**
**  P-vector plus scaled p-vector.
**
**  Given:
**     a      double[3]     first p-vector
**     s      double        scalar (multiplier for b)
**     b      double[3]     second p-vector
**
**  Returned:
**     apsb   double[3]     a + s*b
**
**  Note:
**     It is permissible for any of a, b and apsb to be the same array.
**
**  Called:
**     eraSxp       multiply p-vector by scalar
**     eraPpp       p-vector plus p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var apsb = [0, 0, 0];;


   var sb = [];


/* s*b. */
   sb = eraSxp(s, b);

/* a + s*b. */
   apsb = eraPpp(a, sb);

/* Finished. */

return apsb;
}