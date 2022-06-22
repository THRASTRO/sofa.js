function eraFk5hip(r5h)
/*
**  - - - - - - - - - -
**   e r a F k 5 h i p
**  - - - - - - - - - -
**
**  FK5 to Hipparcos rotation and spin.
**
**  Returned:
**     r5h   double[3][3]  r-matrix: FK5 rotation wrt Hipparcos (Note 2)
**     s5h   double[3]     r-vector: FK5 spin wrt Hipparcos (Note 3)
**
**  Notes:
**
**  1) This function models the FK5 to Hipparcos transformation as a
**     pure rotation and spin;  zonal errors in the FK5 catalogue are
**     not taken into account.
**
**  2) The r-matrix r5h operates in the sense:
**
**           P_Hipparcos = r5h x P_FK5
**
**     where P_FK5 is a p-vector in the FK5 frame, and P_Hipparcos is
**     the equivalent Hipparcos p-vector.
**
**  3) The r-vector s5h represents the time derivative of the FK5 to
**     Hipparcos rotation.  The units are radians per year (Julian,
**     TDB).
**
**  Called:
**     eraRv2m      r-vector to r-matrix
**
**  Reference:
**
**     F.Mignard & M.Froeschle, Astron.Astrophys., 354, 732-739 (2000).
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var s5h = [0, 0, 0];;


   var v = [];

/* FK5 wrt Hipparcos orientation and spin (radians, radians/year) */
   var epx, epy, epz;
   var omx, omy, omz;


   epx = -19.9e-3 * ERFA_DAS2R;
   epy =  -9.1e-3 * ERFA_DAS2R;
   epz =  22.9e-3 * ERFA_DAS2R;

   omx = -0.30e-3 * ERFA_DAS2R;
   omy =  0.60e-3 * ERFA_DAS2R;
   omz =  0.70e-3 * ERFA_DAS2R;

/* FK5 to Hipparcos orientation expressed as an r-vector. */
   v[0] = epx;
   v[1] = epy;
   v[2] = epz;

/* Re-express as an r-matrix. */
   r5h = eraRv2m(v, r5h);

/* Hipparcos wrt FK5 spin expressed as an r-vector. */
   s5h[0] = omx;
   s5h[1] = omy;
   s5h[2] = omz;

/* Finished. */

return s5h;
}