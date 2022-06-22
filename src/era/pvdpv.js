function eraPvdpv(a, b)
/*
**  - - - - - - - - -
**   e r a P v d p v
**  - - - - - - - - -
**
**  Inner (=scalar=dot) product of two pv-vectors.
**
**  Given:
**     a        double[2][3]      first pv-vector
**     b        double[2][3]      second pv-vector
**
**  Returned:
**     adb      double[2]         a . b (see note)
**
**  Note:
**
**     If the position and velocity components of the two pv-vectors are
**     ( ap, av ) and ( bp, bv ), the result, a . b, is the pair of
**     numbers ( ap . bp , ap . bv + av . bp ).  The two numbers are the
**     dot-product of the two p-vectors and its derivative.
**
**  Called:
**     eraPdp       scalar product of two p-vectors
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var adb = [0, 0];;


   var adbd, addb;


/* a . b = constant part of result. */
   adb[0] = eraPdp(a[0], b[0]);

/* a . bdot */
   adbd = eraPdp(a[0], b[1]);

/* adot . b */
   addb = eraPdp(a[1], b[0]);

/* Velocity part of result. */
   adb[1] = adbd + addb;

/* Finished. */

return adb;
}