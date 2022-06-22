function eraEpj2jd(epj)
/*
**  - - - - - - - - - -
**   e r a E p j 2 j d
**  - - - - - - - - - -
**
**  Julian Epoch to Julian Date.
**
**  Given:
**     epj      double    Julian Epoch (e.g. 1996.8)
**
**  Returned:
**     djm0     double    MJD zero-point: always 2400000.5
**     djm      double    Modified Julian Date
**
**  Note:
**
**     The Julian Date is returned in two pieces, in the usual ERFA
**     manner, which is designed to preserve time resolution.  The
**     Julian Date is available as a single number by adding djm0 and
**     djm.
**
**  Reference:
**
**     Lieske, J.H., 1979, Astron.Astrophys. 73, 282.
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var djm0 = 0.0;;
   var djm = 0.0;;


   djm0 = ERFA_DJM0;
   djm = ERFA_DJM00 + (epj - 2000.0) * 365.25;

/* Finished. */

return [djm0, djm];
}