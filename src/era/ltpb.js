function eraLtpb(epj)
/*
**  - - - - - - - -
**   e r a L t p b
**  - - - - - - - -
**
**  Long-term precession matrix, including ICRS frame bias.
**
**  Given:
**     epj     double         Julian epoch (TT)
**
**  Returned:
**     rpb     double[3][3]   precession-bias matrix, J2000.0 to date
**
**  Notes:
**
**  1) The matrix is in the sense
**
**        P_date = rpb x P_ICRS,
**
**     where P_ICRS is a vector in the Geocentric Celestial Reference
**     System, and P_date is the vector with respect to the Celestial
**     Intermediate Reference System at that date but with nutation
**     neglected.
**
**  2) A first order frame bias formulation is used, of sub-
**     microarcsecond accuracy compared with a full 3D rotation.
**
**  3) The Vondrak et al. (2011, 2012) 400 millennia precession model
**     agrees with the IAU 2006 precession at J2000.0 and stays within
**     100 microarcseconds during the 20th and 21st centuries.  It is
**     accurate to a few arcseconds throughout the historical period,
**     worsening to a few tenths of a degree at the end of the
**     +/- 200,000 year time span.
**
**  References:
**
**    Vondrak, J., Capitaine, N. and Wallace, P., 2011, New precession
**    expressions, valid for long time intervals, Astron.Astrophys. 534,
**    A22
**
**    Vondrak, J., Capitaine, N. and Wallace, P., 2012, New precession
**    expressions, valid for long time intervals (Corrigendum),
**    Astron.Astrophys. 541, C1
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var rpb = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof rpb == 'undefined') {
      rpb = [ [0,0,0], [0,0,0], [0,0,0] ];
   }

/* Frame bias (IERS Conventions 2010, Eqs. 5.21 and 5.33) */
   var dx = -0.016617 * ERFA_DAS2R,
                de = -0.0068192 * ERFA_DAS2R,
                dr = -0.0146 * ERFA_DAS2R;

   var i;
   var rp = [[], [], []];


/* Precession matrix. */
   rp = eraLtp(epj);

/* Apply the bias. */
   for ( i = 0; i < 3; i++ ) {
      rpb[i][0] =  rp[i][0]    - rp[i][1]*dr + rp[i][2]*dx;
      rpb[i][1] =  rp[i][0]*dr + rp[i][1]    + rp[i][2]*de;
      rpb[i][2] = -rp[i][0]*dx - rp[i][1]*de + rp[i][2];
   }

return rpb;
}