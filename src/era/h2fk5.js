function eraH2fk5(rh, dh, drh, ddh, pxh, rvh)
/*
**  - - - - - - - - -
**   e r a H 2 f k 5
**  - - - - - - - - -
**
**  Transform Hipparcos star data into the FK5 (J2000.0) system.
**
**  Given (all Hipparcos, epoch J2000.0):
**     rh      double    RA (radians)
**     dh      double    Dec (radians)
**     drh     double    proper motion in RA (dRA/dt, rad/Jyear)
**     ddh     double    proper motion in Dec (dDec/dt, rad/Jyear)
**     pxh     double    parallax (arcsec)
**     rvh     double    radial velocity (km/s, positive = receding)
**
**  Returned (all FK5, equinox J2000.0, epoch J2000.0):
**     r5      double    RA (radians)
**     d5      double    Dec (radians)
**     dr5     double    proper motion in RA (dRA/dt, rad/Jyear)
**     dd5     double    proper motion in Dec (dDec/dt, rad/Jyear)
**     px5     double    parallax (arcsec)
**     rv5     double    radial velocity (km/s, positive = receding)
**
**  Notes:
**
**  1) This function transforms Hipparcos star positions and proper
**     motions into FK5 J2000.0.
**
**  2) The proper motions in RA are dRA/dt rather than
**     cos(Dec)*dRA/dt, and are per year rather than per century.
**
**  3) The FK5 to Hipparcos transformation is modeled as a pure
**     rotation and spin;  zonal errors in the FK5 catalog are not
**     taken into account.
**
**  4) See also eraFk52h, eraFk5hz, eraHfk5z.
**
**  Called:
**     eraStarpv    star catalog data to space motion pv-vector
**     eraFk5hip    FK5 to Hipparcos rotation and spin
**     eraRv2m      r-vector to r-matrix
**     eraRxp       product of r-matrix and p-vector
**     eraTrxp      product of transpose of r-matrix and p-vector
**     eraPxp       vector product of two p-vectors
**     eraPmp       p-vector minus p-vector
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
   var r5 = 0.0;;
   var d5 = 0.0;;
   var dr5 = 0.0;;
   var dd5 = 0.0;;
   var px5 = 0.0;;
   var rv5 = 0.0;;
   var _rv1, _rv8;

   var i;
   var pvh = [[], []], r5h = [[], [], []], s5h = [], sh = [], wxp = [], vv = [], pv5 = [[], []];


/* Hipparcos barycentric position/velocity pv-vector (normalized). */
   (_rv1 = eraStarpv(rh, dh, drh, ddh, pxh, rvh))[0];
   pvh = _rv1[1];

/* FK5 to Hipparcos orientation matrix and spin vector. */
   s5h = eraFk5hip(r5h);

/* Make spin units per day instead of per year. */
   for ( i = 0; i < 3; s5h[i++] /= 365.25 );

/* Orient the spin into the Hipparcos system. */
   sh = eraRxp(r5h, s5h);

/* De-orient the Hipparcos position into the FK5 system. */
   pv5[0] = eraTrxp(r5h, pvh[0]);

/* Apply spin to the position giving an extra space motion component. */
   wxp = eraPxp(pvh[0], sh);

/* Subtract this component from the Hipparcos space motion. */
   vv = eraPmp(pvh[1], wxp);

/* De-orient the Hipparcos space motion into the FK5 system. */
   pv5[1] = eraTrxp(r5h, vv);

/* FK5 pv-vector to spherical. */
   (_rv8 = eraPvstar(pv5))[0];
   r5 = _rv8[1];
   d5 = _rv8[2];
   dr5 = _rv8[3];
   dd5 = _rv8[4];
   px5 = _rv8[5];
   rv5 = _rv8[6];

/* Finished. */

return [r5, d5, dr5, dd5, px5, rv5];
}