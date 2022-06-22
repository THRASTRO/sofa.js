function eraFk5hz(r5, d5, date1, date2)
/*
**  - - - - - - - - -
**   e r a F k 5 h z
**  - - - - - - - - -
**
**  Transform an FK5 (J2000.0) star position into the system of the
**  Hipparcos catalogue, assuming zero Hipparcos proper motion.
**
**  Given:
**     r5           double   FK5 RA (radians), equinox J2000.0, at date
**     d5           double   FK5 Dec (radians), equinox J2000.0, at date
**     date1,date2  double   TDB date (Notes 1,2)
**
**  Returned:
**     rh           double   Hipparcos RA (radians)
**     dh           double   Hipparcos Dec (radians)
**
**  Notes:
**
**  1) This function converts a star position from the FK5 system to
**     the Hipparcos system, in such a way that the Hipparcos proper
**     motion is zero.  Because such a star has, in general, a non-zero
**     proper motion in the FK5 system, the function requires the date
**     at which the position in the FK5 system was determined.
**
**  2) The TT date date1+date2 is a Julian Date, apportioned in any
**     convenient way between the two arguments.  For example,
**     JD(TT)=2450123.7 could be expressed in any of these ways,
**     among others:
**
**            date1          date2
**
**         2450123.7           0.0       (JD method)
**         2451545.0       -1421.3       (J2000 method)
**         2400000.5       50123.2       (MJD method)
**         2450123.5           0.2       (date & time method)
**
**     The JD method is the most natural and convenient to use in
**     cases where the loss of several decimal digits of resolution
**     is acceptable.  The J2000 method is best matched to the way
**     the argument is handled internally and will deliver the
**     optimum resolution.  The MJD method and the date & time methods
**     are both good compromises between resolution and convenience.
**
**  3) The FK5 to Hipparcos transformation is modeled as a pure
**     rotation and spin;  zonal errors in the FK5 catalogue are not
**     taken into account.
**
**  4) The position returned by this function is in the Hipparcos
**     reference system but at date date1+date2.
**
**  5) See also eraFk52h, eraH2fk5, eraHfk5z.
**
**  Called:
**     eraS2c       spherical coordinates to unit vector
**     eraFk5hip    FK5 to Hipparcos rotation and spin
**     eraSxp       multiply p-vector by scalar
**     eraRv2m      r-vector to r-matrix
**     eraTrxp      product of transpose of r-matrix and p-vector
**     eraPxp       vector product of two p-vectors
**     eraC2s       p-vector to spherical
**     eraAnp       normalize angle into range 0 to 2pi
**
**  Reference:
**
**     F.Mignard & M.Froeschle, 2000, Astron.Astrophys. 354, 732-739.
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var rh = 0.0;;
   var dh = 0.0;;
   var _rv7;

   var t, p5e = [], r5h = [[], [], []], s5h = [], vst = [], rst = [[], [], []], p5 = [], ph = [], w;


/* Interval from given date to fundamental epoch J2000.0 (JY). */
   t = - ((date1 - ERFA_DJ00) + date2) / ERFA_DJY;

/* FK5 barycentric position vector. */
   p5e = eraS2c(r5, d5);

/* FK5 to Hipparcos orientation matrix and spin vector. */
   s5h = eraFk5hip(r5h);

/* Accumulated Hipparcos wrt FK5 spin over that interval. */
   vst = eraSxp(t, s5h);

/* Express the accumulated spin as a rotation matrix. */
   rst = eraRv2m(vst, rst);

/* Derotate the vector's FK5 axes back to date. */
   p5 = eraTrxp(rst, p5e);

/* Rotate the vector into the Hipparcos system. */
   ph = eraRxp(r5h, p5);

/* Hipparcos vector to spherical. */
   (_rv7 = eraC2s(ph))[0];
   w = _rv7[0];
   dh = _rv7[1];
   rh = eraAnp(w);

/* Finished. */

return [rh, dh];
}