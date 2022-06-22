function eraLteceq(epj, dl, db)
/*
**  - - - - - - - - - -
**   e r a L t e c e q
**  - - - - - - - - - -
**
**  Transformation from ecliptic coordinates (mean equinox and ecliptic
**  of date) to ICRS RA,Dec, using a long-term precession model.
**
**  Given:
**     epj     double     Julian epoch (TT)
**     dl,db   double     ecliptic longitude and latitude (radians)
**
**  Returned:
**     dr,dd   double     ICRS right ascension and declination (radians)
**
**  1) No assumptions are made about whether the coordinates represent
**     starlight and embody astrometric effects such as parallax or
**     aberration.
**
**  2) The transformation is approximately that from ecliptic longitude
**     and latitude (mean equinox and ecliptic of date) to mean J2000.0
**     right ascension and declination, with only frame bias (always
**     less than 25 mas) to disturb this classical picture.
**
**  3) The Vondrak et al. (2011, 2012) 400 millennia precession model
**     agrees with the IAU 2006 precession at J2000.0 and stays within
**     100 microarcseconds during the 20th and 21st centuries.  It is
**     accurate to a few arcseconds throughout the historical period,
**     worsening to a few tenths of a degree at the end of the
**     +/- 200,000 year time span.
**
**  Called:
**     eraS2c       spherical coordinates to unit vector
**     eraLtecm     J2000.0 to ecliptic rotation matrix, long term
**     eraTrxp      product of transpose of r-matrix and p-vector
**     eraC2s       unit vector to spherical coordinates
**     eraAnp       normalize angle into range 0 to 2pi
**     eraAnpm      normalize angle into range +/- pi
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
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var dr = 0.0;;
   var dd = 0.0;;
   var _rv4;

   var rm = [[], [], []], v1 = [], v2 = [], a, b;


/* Spherical to Cartesian. */
   v1 = eraS2c(dl, db);

/* Rotation matrix, ICRS equatorial to ecliptic. */
   rm = eraLtecm(epj);

/* The transformation from ecliptic to ICRS. */
   v2 = eraTrxp(rm, v1);

/* Cartesian to spherical. */
   (_rv4 = eraC2s(v2))[0];
   a = _rv4[0];
   b = _rv4[1];

/* Express in conventional ranges. */
   dr = eraAnp(a);
   dd = eraAnpm(b);

/* Finished. */

return [dr, dd];
}