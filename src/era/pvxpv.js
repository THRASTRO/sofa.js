function eraPvxpv(a, b)
/*
**  - - - - - - - - -
**   e r a P v x p v
**  - - - - - - - - -
**
**  Outer (=vector=cross) product of two pv-vectors.
**
**  Given:
**     a        double[2][3]      first pv-vector
**     b        double[2][3]      second pv-vector
**
**  Returned:
**     axb      double[2][3]      a x b
**
**  Notes:
**
**  1) If the position and velocity components of the two pv-vectors are
**     ( ap, av ) and ( bp, bv ), the result, a x b, is the pair of
**     vectors ( ap x bp, ap x bv + av x bp ).  The two vectors are the
**     cross-product of the two p-vectors and its derivative.
**
**  2) It is permissible to re-use the same array for any of the
**     arguments.
**
**  Called:
**     eraCpv       copy pv-vector
**     eraPxp       vector product of two p-vectors
**     eraPpp       p-vector plus p-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var axb = [ [0,0,0], [0,0,0] ];;


   var wa = [[], []], wb = [[], []], axbd = [], adxb = [];


/* Make copies of the inputs. */
   wa = eraCpv(a);
   wb = eraCpv(b);

/* a x b = position part of result. */
   axb[0] = eraPxp(wa[0], wb[0]);

/* a x bdot + adot x b = velocity part of result. */
   axbd = eraPxp(wa[0], wb[1]);
   adxb = eraPxp(wa[1], wb[0]);
   axb[1] = eraPpp(axbd, adxb);

/* Finished. */

return axb;
}