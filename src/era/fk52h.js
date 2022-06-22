function eraFk52h(r5, d5, dr5, dd5, px5, rv5)
/*
**  - - - - - - - - -
**   e r a F k 5 2 h
**  - - - - - - - - -
**
**  Transform FK5 (J2000.0) star data into the Hipparcos system.
**
**  Given (all FK5, equinox J2000.0, epoch J2000.0):
**     r5      double    RA (radians)
**     d5      double    Dec (radians)
**     dr5     double    proper motion in RA (dRA/dt, rad/Jyear)
**     dd5     double    proper motion in Dec (dDec/dt, rad/Jyear)
**     px5     double    parallax (arcsec)
**     rv5     double    radial velocity (km/s, positive = receding)
**
**  Returned (all Hipparcos, epoch J2000.0):
**     rh      double    RA (radians)
**     dh      double    Dec (radians)
**     drh     double    proper motion in RA (dRA/dt, rad/Jyear)
**     ddh     double    proper motion in Dec (dDec/dt, rad/Jyear)
**     pxh     double    parallax (arcsec)
**     rvh     double    radial velocity (km/s, positive = receding)
**
**  Notes:
**
**  1) This function transforms FK5 star positions and proper motions
**     into the system of the Hipparcos catalog.
**
**  2) The proper motions in RA are dRA/dt rather than
**     cos(Dec)*dRA/dt, and are per year rather than per century.
**
**  3) The FK5 to Hipparcos transformation is modeled as a pure
**     rotation and spin;  zonal errors in the FK5 catalog are not
**     taken into account.
**
**  4) See also eraH2fk5, eraFk5hz, eraHfk5z.
**
**  Called:
**     eraStarpv    star catalog data to space motion pv-vector
**     eraFk5hip    FK5 to Hipparcos rotation and spin
**     eraRxp       product of r-matrix and p-vector
**     eraPxp       vector product of two p-vectors
**     eraPpp       p-vector plus p-vector
**     eraPvstar    space motion pv-vector to star catalog data
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
   var rh = 0.0;;
   var dh = 0.0;;
   var drh = 0.0;;
   var ddh = 0.0;;
   var pxh = 0.0;;
   var rvh = 0.0;;
   var _rv1, _rv7;

   var i;
   var pv5 = [[], []], r5h = [[], [], []], s5h = [], wxp = [], vv = [], pvh = [[], []];


/* FK5 barycentric position/velocity pv-vector (normalized). */
   (_rv1 = eraStarpv(r5, d5, dr5, dd5, px5, rv5))[0];
   pv5 = _rv1[1];

/* FK5 to Hipparcos orientation matrix and spin vector. */
   s5h = eraFk5hip(r5h);

/* Make spin units per day instead of per year. */
   for ( i = 0; i < 3; s5h[i++] /= 365.25 );

/* Orient the FK5 position into the Hipparcos system. */
   pvh[0] = eraRxp(r5h, pv5[0]);

/* Apply spin to the position giving an extra space motion component. */
   wxp = eraPxp(pv5[0], s5h);

/* Add this component to the FK5 space motion. */
   vv = eraPpp(wxp, pv5[1]);

/* Orient the FK5 space motion into the Hipparcos system. */
   pvh[1] = eraRxp(r5h, vv);

/* Hipparcos pv-vector to spherical. */
   (_rv7 = eraPvstar(pvh))[0];
   rh = _rv7[1];
   dh = _rv7[2];
   drh = _rv7[3];
   ddh = _rv7[4];
   pxh = _rv7[5];
   rvh = _rv7[6];

/* Finished. */

return [rh, dh, drh, ddh, pxh, rvh];
}