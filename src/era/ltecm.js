function eraLtecm(epj)
/*
**  - - - - - - - - -
**   e r a L t e c m
**  - - - - - - - - -
**
**  ICRS equatorial to ecliptic rotation matrix, long-term.
**
**  Given:
**     epj     double         Julian epoch (TT)
**
**  Returned:
**     rm      double[3][3]   ICRS to ecliptic rotation matrix
**
**  Notes:
**
**  1) The matrix is in the sense
**
**        E_ep = rm x P_ICRS,
**
**     where P_ICRS is a vector with respect to ICRS right ascension
**     and declination axes and E_ep is the same vector with respect to
**     the (inertial) ecliptic and equinox of epoch epj.
**
**  2) P_ICRS is a free vector, merely a direction, typically of unit
**     magnitude, and not bound to any particular spatial origin, such
**     as the Earth, Sun or SSB.  No assumptions are made about whether
**     it represents starlight and embodies astrometric effects such as
**     parallax or aberration.  The transformation is approximately that
**     between mean J2000.0 right ascension and declination and ecliptic
**     longitude and latitude, with only frame bias (always less than
**     25 mas) to disturb this classical picture.
**
**  3) The Vondrak et al. (2011, 2012) 400 millennia precession model
**     agrees with the IAU 2006 precession at J2000.0 and stays within
**     100 microarcseconds during the 20th and 21st centuries.  It is
**     accurate to a few arcseconds throughout the historical period,
**     worsening to a few tenths of a degree at the end of the
**     +/- 200,000 year time span.
**
**  Called:
**     eraLtpequ    equator pole, long term
**     eraLtpecl    ecliptic pole, long term
**     eraPxp       vector product
**     eraPn        normalize vector
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
   var rm = [ [0,0,0], [0,0,0], [0,0,0] ];;
   if (typeof rm == 'undefined') {
      rm = [ [0,0,0], [0,0,0], [0,0,0] ];
   }   var _rv4;

/* Frame bias (IERS Conventions 2010, Eqs. 5.21 and 5.33) */
   var dx = -0.016617 * ERFA_DAS2R,
                de = -0.0068192 * ERFA_DAS2R,
                dr = -0.0146 * ERFA_DAS2R;

   var p = [], z = [], w = [], s, x = [], y = [];


/* Equator pole. */
   p = eraLtpequ(epj);

/* Ecliptic pole (bottom row of equatorial to ecliptic matrix). */
   z = eraLtpecl(epj);

/* Equinox (top row of matrix). */
   w = eraPxp(p, z);
   (_rv4 = eraPn(w))[0];
   s = _rv4[0];
   x = _rv4[1];

/* Middle row of matrix. */
   y = eraPxp(z, x);

/* Combine with frame bias. */
   rm[0][0] =   x[0]    - x[1]*dr + x[2]*dx;
   rm[0][1] =   x[0]*dr + x[1]    + x[2]*de;
   rm[0][2] = - x[0]*dx - x[1]*de + x[2];
   rm[1][0] =   y[0]    - y[1]*dr + y[2]*dx;
   rm[1][1] =   y[0]*dr + y[1]    + y[2]*de;
   rm[1][2] = - y[0]*dx - y[1]*de + y[2];
   rm[2][0] =   z[0]    - z[1]*dr + z[2]*dx;
   rm[2][1] =   z[0]*dr + z[1]    + z[2]*de;
   rm[2][2] = - z[0]*dx - z[1]*de + z[2];

return rm;
}