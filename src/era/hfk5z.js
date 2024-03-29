function eraHfk5z(rh, dh, date1, date2)
/*
**  - - - - - - - - -
**   e r a H f k 5 z
**  - - - - - - - - -
**
**  Transform a Hipparcos star position into FK5 J2000.0, assuming
**  zero Hipparcos proper motion.
**
**  Given:
**     rh            double    Hipparcos RA (radians)
**     dh            double    Hipparcos Dec (radians)
**     date1,date2   double    TDB date (Note 1)
**
**  Returned (all FK5, equinox J2000.0, date date1+date2):
**     r5            double    RA (radians)
**     d5            double    Dec (radians)
**     dr5           double    FK5 RA proper motion (rad/year, Note 4)
**     dd5           double    Dec proper motion (rad/year, Note 4)
**
**  Notes:
**
**  1) The TT date date1+date2 is a Julian Date, apportioned in any
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
**  2) The proper motion in RA is dRA/dt rather than cos(Dec)*dRA/dt.
**
**  3) The FK5 to Hipparcos transformation is modeled as a pure rotation
**     and spin;  zonal errors in the FK5 catalogue are not taken into
**     account.
**
**  4) It was the intention that Hipparcos should be a close
**     approximation to an inertial frame, so that distant objects have
**     zero proper motion;  such objects have (in general) non-zero
**     proper motion in FK5, and this function returns those fictitious
**     proper motions.
**
**  5) The position returned by this function is in the FK5 J2000.0
**     reference system but at date date1+date2.
**
**  6) See also eraFk52h, eraH2fk5, eraFk5zhz.
**
**  Called:
**     eraS2c       spherical coordinates to unit vector
**     eraFk5hip    FK5 to Hipparcos rotation and spin
**     eraRxp       product of r-matrix and p-vector
**     eraSxp       multiply p-vector by scalar
**     eraRxr       product of two r-matrices
**     eraTrxp      product of transpose of r-matrix and p-vector
**     eraPxp       vector product of two p-vectors
**     eraPv2s      pv-vector to spherical
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
   var r5 = 0.0;;
   var d5 = 0.0;;
   var dr5 = 0.0;;
   var dd5 = 0.0;;
   var _rv10;

   var t, ph = [], r5h = [[], [], []], s5h = [], sh = [], vst = [], rst = [[], [], []], r5ht = [[], [], []], pv5e = [[], []], vv = [], w, r, v;


/* Time interval from fundamental epoch J2000.0 to given date (JY). */
   t = ((date1 - ERFA_DJ00) + date2) / ERFA_DJY;

/* Hipparcos barycentric position vector (normalized). */
   ph = eraS2c(rh, dh);

/* FK5 to Hipparcos orientation matrix and spin vector. */
   s5h = eraFk5hip(r5h);

/* Rotate the spin into the Hipparcos system. */
   sh = eraRxp(r5h, s5h);

/* Accumulated Hipparcos wrt FK5 spin over that interval. */
   vst = eraSxp(t, s5h);

/* Express the accumulated spin as a rotation matrix. */
   rst = eraRv2m(vst, rst);

/* Rotation matrix:  accumulated spin, then FK5 to Hipparcos. */
   r5ht = eraRxr(r5h, rst);

/* De-orient & de-spin the Hipparcos position into FK5 J2000.0. */
   pv5e[0] = eraTrxp(r5ht, ph);

/* Apply spin to the position giving a space motion. */
   vv = eraPxp(sh, ph);

/* De-orient & de-spin the Hipparcos space motion into FK5 J2000.0. */
   pv5e[1] = eraTrxp(r5ht, vv);

/* FK5 position/velocity pv-vector to spherical. */
   (_rv10 = eraPv2s(pv5e))[0];
   w = _rv10[0];
   d5 = _rv10[1];
   r = _rv10[2];
   dr5 = _rv10[3];
   dd5 = _rv10[4];
   v = _rv10[5];
   r5 = eraAnp(w);

/* Finished. */

return [r5, d5, dr5, dd5];
}