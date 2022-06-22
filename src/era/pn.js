function eraPn(p)
/*
**  - - - - - -
**   e r a P n
**  - - - - - -
**
**  Convert a p-vector into modulus and unit vector.
**
**  Given:
**     p        double[3]      p-vector
**
**  Returned:
**     r        double         modulus
**     u        double[3]      unit vector
**
**  Notes:
**
**  1) If p is null, the result is null.  Otherwise the result is a unit
**     vector.
**
**  2) It is permissible to re-use the same array for any of the
**     arguments.
**
**  Called:
**     eraPm        modulus of p-vector
**     eraZp        zero p-vector
**     eraSxp       multiply p-vector by scalar
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var r = 0.0;;
   var u = [0, 0, 0];;


   var w;


/* Obtain the modulus and test for zero. */
   w = eraPm(p);
   if (w == 0.0) {

   /* Null vector. */
      u = eraZp(u);

   } else {

   /* Unit vector. */
      u = eraSxp(1.0/w, p);
   }

/* Return the modulus. */
   r = w;

/* Finished. */

return [r, u];
}