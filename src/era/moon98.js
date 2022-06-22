function eraMoon98( date1, date2)
/*
**  - - - - - - - - - -
**   e r a M o o n 9 8
**  - - - - - - - - - -
**
**  Approximate geocentric position and velocity of the Moon.
**
**  n.b. Not IAU-endorsed and without canonical status.
**
**  Given:
**     date1  double         TT date part A (Notes 1,4)
**     date2  double         TT date part B (Notes 1,4)
**
**  Returned:
**     pv     double[2][3]   Moon p,v, GCRS (AU, AU/d, Note 5)
**
**  Notes:
**
**  1) The TT date date1+date2 is a Julian Date, apportioned in any
**     convenient way between the two arguments.  For example,
**     JD(TT)=2450123.7 could be expressed in any of these ways, among
**     others:
**
**            date1          date2
**
**         2450123.7           0.0       (JD method)
**         2451545.0       -1421.3       (J2000 method)
**         2400000.5       50123.2       (MJD method)
**         2450123.5           0.2       (date & time method)
**
**     The JD method is the most natural and convenient to use in cases
**     where the loss of several decimal digits of resolution is
**     acceptable.  The J2000 method is best matched to the way the
**     argument is handled internally and will deliver the optimum
**     resolution.  The MJD method and the date & time methods are both
**     good compromises between resolution and convenience.  The limited
**     accuracy of the present algorithm is such that any of the methods
**     is satisfactory.
**
**  2) This function is a full implementation of the algorithm
**     published by Meeus (see reference) except that the light-time
**     correction to the Moon's mean longitude has been omitted.
**
**  3) Comparisons with ELP/MPP02 over the interval 1950-2100 gave RMS
**     errors of 2.9 arcsec in geocentric direction, 6.1 km in position
**     and 36 mm/s in velocity.  The worst case errors were 18.3 arcsec
**     in geocentric direction, 31.7 km in position and 172 mm/s in
**     velocity.
**
**  4) The original algorithm is expressed in terms of "dynamical time",
**     which can either be TDB or TT without any significant change in
**     accuracy.  UT cannot be used without incurring significant errors
**     (30 arcsec in the present era) due to the Moon's 0.5 arcsec/sec
**     movement.
**
**  5) The result is with respect to the GCRS (the same as J2000.0 mean
**     equator and equinox to within 23 mas).
**
**  6) Velocity is obtained by a complete analytical differentiation
**     of the Meeus model.
**
**  7) The Meeus algorithm generates position and velocity in mean
**     ecliptic coordinates of date, which the present function then
**     rotates into GCRS.  Because the ecliptic system is precessing,
**     there is a coupling between this spin (about 1.4 degrees per
**     century) and the Moon position that produces a small velocity
**     contribution.  In the present function this effect is neglected
**     as it corresponds to a maximum difference of less than 3 mm/s and
**     increases the RMS error by only 0.4%.
**
**  References:
**
**     Meeus, J., Astronomical Algorithms, 2nd edition, Willmann-Bell,
**     1998, p337.
**
**     Simon, J.L., Bretagnon, P., Chapront, J., Chapront-Touze, M.,
**     Francou, G. & Laskar, J., Astron.Astrophys., 1994, 282, 663
**
**  Defined in erfam.h:
**     ERFA_DAU           astronomical unit (m)
**     ERFA_DJC           days per Julian century
**     ERFA_DJ00          reference epoch (J2000.0), Julian Date
**     ERFA_DD2R          degrees to radians
**
**  Called:
**     eraS2pv      spherical coordinates to pv-vector
**     eraPfw06     bias-precession F-W angles, IAU 2006
**     eraIr        initialize r-matrix to identity
**     eraRz        rotate around Z-axis
**     eraRx        rotate around X-axis
**     eraRxpv      product of r-matrix and pv-vector
**
**  This revision:  2021 May 11
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var pv = [ [0,0,0], [0,0,0] ];;
   var _rv2;

/*
**  Coefficients for fundamental arguments:
**
**  . Powers of time in Julian centuries
**  . Units are degrees.
*/

/* Moon's mean longitude (wrt mean equinox and ecliptic of date) */
   var elp0 = 218.31665436,        /* Simon et al. (1994). */
                 elp1 = 481267.88123421,
                 elp2 = -0.0015786,
                 elp3 = 1.0 / 538841.0,
                 elp4 = -1.0 / 65194000.0;
   var elp, delp;

/* Moon's mean elongation */
   var d0 = 297.8501921,
                 d1 = 445267.1114034,
                 d2 = -0.0018819,
                 d3 = 1.0 / 545868.0,
                 d4 = 1.0 / 113065000.0;
   var d, dd;

/* Sun's mean anomaly */
   var em0 = 357.5291092,
                 em1 = 35999.0502909,
                 em2 = -0.0001536,
                 em3 = 1.0 / 24490000.0,
                 em4 = 0.0;
   var em, dem;

/* Moon's mean anomaly */
   var emp0 = 134.9633964,
                 emp1 = 477198.8675055,
                 emp2 = 0.0087414,
                 emp3 = 1.0 / 69699.0,
                 emp4 = -1.0 / 14712000.0;
   var emp, demp;

/* Mean distance of the Moon from its ascending node */
   var f0 = 93.2720950,
                 f1 = 483202.0175233,
                 f2 = -0.0036539,
                 f3 = 1.0 / 3526000.0,
                 f4 = 1.0 / 863310000.0;
   var f, df;

/*
** Other arguments
*/

/* Meeus A_1, due to Venus (deg) */
   var a10 = 119.75, a11 = 131.849;
   var a1, da1;

/* Meeus A_2, due to Jupiter (deg) */
   var a20 = 53.09, a21 = 479264.290;
   var a2, da2;

/* Meeus A_3, due to sidereal motion of the Moon in longitude (deg) */
   var a30 = 313.45, a31 = 481266.484;
   var a3, da3;

/* Coefficients for Meeus "additive terms" (deg) */
   var al1 =  0.003958, al2 =  0.001962, al3 =  0.000318;
   var ab1 = -0.002235, ab2 =  0.000382, ab3 =  0.000175, ab4 =  0.000175, ab5 =  0.000127, ab6 = -0.000115;

/* Fixed term in distance (m) */
   var r0 = 385000560.0;

/* Coefficients for (dimensionless) E factor */
   var e1 = -0.002516, e2 = -0.0000074;
   var e, de, esq, desq;

/*
** Coefficients for Moon longitude and distance series
*/
//struct termlr { 
//      var nd;           /* multiple of D  in argument           */
//      var nem;          /*     "    "  M   "    "               */
//      var nemp;         /*     "    "  M'  "    "               */
//      var nf;           /*     "    "  F   "    "               */
//      var coefl;     /* coefficient of L sine argument (deg) */
//      var coefr;     /* coefficient of R cosine argument (m) */
//    };

var tlr = [
[0,  0,  1,  0,  6.288774, -20905355.0],
[2,  0, -1,  0,  1.274027,  -3699111.0],
[2,  0,  0,  0,  0.658314,  -2955968.0],
[0,  0,  2,  0,  0.213618,   -569925.0],
[0,  1,  0,  0, -0.185116,     48888.0],
[0,  0,  0,  2, -0.114332,     -3149.0],
[2,  0, -2,  0,  0.058793,    246158.0],
[2, -1, -1,  0,  0.057066,   -152138.0],
[2,  0,  1,  0,  0.053322,   -170733.0],
[2, -1,  0,  0,  0.045758,   -204586.0],
[0,  1, -1,  0, -0.040923,   -129620.0],
[1,  0,  0,  0, -0.034720,    108743.0],
[0,  1,  1,  0, -0.030383,    104755.0],
[2,  0,  0, -2,  0.015327,     10321.0],
[0,  0,  1,  2, -0.012528,         0.0],
[0,  0,  1, -2,  0.010980,     79661.0],
[4,  0, -1,  0,  0.010675,    -34782.0],
[0,  0,  3,  0,  0.010034,    -23210.0],
[4,  0, -2,  0,  0.008548,    -21636.0],
[2,  1, -1,  0, -0.007888,     24208.0],
[2,  1,  0,  0, -0.006766,     30824.0],
[1,  0, -1,  0, -0.005163,     -8379.0],
[1,  1,  0,  0,  0.004987,    -16675.0],
[2, -1,  1,  0,  0.004036,    -12831.0],
[2,  0,  2,  0,  0.003994,    -10445.0],
[4,  0,  0,  0,  0.003861,    -11650.0],
[2,  0, -3,  0,  0.003665,     14403.0],
[0,  1, -2,  0, -0.002689,     -7003.0],
[2,  0, -1,  2, -0.002602,         0.0],
[2, -1, -2,  0,  0.002390,     10056.0],
[1,  0,  1,  0, -0.002348,      6322.0],
[2, -2,  0,  0,  0.002236,     -9884.0],
[0,  1,  2,  0, -0.002120,      5751.0],
[0,  2,  0,  0, -0.002069,         0.0],
[2, -2, -1,  0,  0.002048,     -4950.0],
[2,  0,  1, -2, -0.001773,      4130.0],
[2,  0,  0,  2, -0.001595,         0.0],
[4, -1, -1,  0,  0.001215,     -3958.0],
[0,  0,  2,  2, -0.001110,         0.0],
[3,  0, -1,  0, -0.000892,      3258.0],
[2,  1,  1,  0, -0.000810,      2616.0],
[4, -1, -2,  0,  0.000759,     -1897.0],
[0,  2, -1,  0, -0.000713,     -2117.0],
[2,  2, -1,  0, -0.000700,      2354.0],
[2,  1, -2,  0,  0.000691,         0.0],
[2, -1,  0, -2,  0.000596,         0.0],
[4,  0,  1,  0,  0.000549,     -1423.0],
[0,  0,  4,  0,  0.000537,     -1117.0],
[4, -1,  0,  0,  0.000520,     -1571.0],
[1,  0, -2,  0, -0.000487,     -1739.0],
[2,  1,  0, -2, -0.000399,         0.0],
[0,  0,  2, -2, -0.000381,     -4421.0],
[1,  1,  1,  0,  0.000351,         0.0],
[3,  0, -2,  0, -0.000340,         0.0],
[4,  0, -3,  0,  0.000330,         0.0],
[2, -1,  2,  0,  0.000327,         0.0],
[0,  2,  1,  0, -0.000323,      1165.0],
[1,  1, -1,  0,  0.000299,         0.0],
[2,  0,  3,  0,  0.000294,         0.0],
[2,  0, -1, -2,  0.000000,      8752.0]
];

   var NLR = ~~(( 60 ));

/*
** Coefficients for Moon latitude series
*/
//struct termb { 
//      var nd;           /* multiple of D  in argument           */
//      var nem;          /*     "    "  M   "    "               */
//      var nemp;         /*     "    "  M'  "    "               */
//      var nf;           /*     "    "  F   "    "               */
//      var coefb;     /* coefficient of B sine argument (deg) */
//    };

var tb = [
[0,  0,  0,  1,  5.128122],
[0,  0,  1,  1,  0.280602],
[0,  0,  1, -1,  0.277693],
[2,  0,  0, -1,  0.173237],
[2,  0, -1,  1,  0.055413],
[2,  0, -1, -1,  0.046271],
[2,  0,  0,  1,  0.032573],
[0,  0,  2,  1,  0.017198],
[2,  0,  1, -1,  0.009266],
[0,  0,  2, -1,  0.008822],
[2, -1,  0, -1,  0.008216],
[2,  0, -2, -1,  0.004324],
[2,  0,  1,  1,  0.004200],
[2,  1,  0, -1, -0.003359],
[2, -1, -1,  1,  0.002463],
[2, -1,  0,  1,  0.002211],
[2, -1, -1, -1,  0.002065],
[0,  1, -1, -1, -0.001870],
[4,  0, -1, -1,  0.001828],
[0,  1,  0,  1, -0.001794],
[0,  0,  0,  3, -0.001749],
[0,  1, -1,  1, -0.001565],
[1,  0,  0,  1, -0.001491],
[0,  1,  1,  1, -0.001475],
[0,  1,  1, -1, -0.001410],
[0,  1,  0, -1, -0.001344],
[1,  0,  0, -1, -0.001335],
[0,  0,  3,  1,  0.001107],
[4,  0,  0, -1,  0.001021],
[4,  0, -1,  1,  0.000833],
[0,  0,  1, -3,  0.000777],
[4,  0, -2,  1,  0.000671],
[2,  0,  0, -3,  0.000607],
[2,  0,  2, -1,  0.000596],
[2, -1,  1, -1,  0.000491],
[2,  0, -2,  1, -0.000451],
[0,  0,  3, -1,  0.000439],
[2,  0,  2,  1,  0.000422],
[2,  0, -3, -1,  0.000421],
[2,  1, -1,  1, -0.000366],
[2,  1,  0,  1, -0.000351],
[4,  0,  0,  1,  0.000331],
[2, -1,  1,  1,  0.000315],
[2, -2,  0, -1,  0.000302],
[0,  0,  1,  3, -0.000283],
[2,  1,  1, -1, -0.000229],
[1,  1,  0, -1,  0.000223],
[1,  1,  0,  1,  0.000223],
[0,  1, -2, -1, -0.000220],
[2,  1, -1, -1, -0.000220],
[1,  0,  1,  1, -0.000185],
[2, -1, -2, -1,  0.000181],
[0,  1,  2,  1, -0.000177],
[4,  0, -2, -1,  0.000176],
[4, -1, -1, -1,  0.000166],
[1,  0,  1, -1, -0.000164],
[4,  0,  1, -1,  0.000132],
[1,  0, -1, -1, -0.000119],
[4, -1,  0, -1,  0.000115],
[2, -2,  0,  1,  0.000107]
];

   var NB = ~~(( 60 ));

/* Miscellaneous */
   var n, i;
   var t, elpmf, delpmf, vel, vdel, vr, vdr, a1mf, da1mf, a1pf, da1pf, dlpmp, slpmp, vb, vdb, v, dv, emn, empn, dn, fn, en, den, arg, darg, farg, coeff, el, del, r, dr, b, db, gamb, phib, psib, epsa, rm = [[], [], []];

/* ------------------------------------------------------------------ */

/* Centuries since J2000.0 */
   t = ((date1 - ERFA_DJ00) + date2) / ERFA_DJC;

/* --------------------- */
/* Fundamental arguments */
/* --------------------- */

/* Arguments (radians) and derivatives (radians per Julian century)
   for the current date. */

/* Moon's mean longitude. */
   elp = ERFA_DD2R * ((elp0
                   + ( elp1
                   + ( elp2
                   + ( elp3
                   +   elp4 * t ) * t ) * t ) * t) % (360.0));
   delp = ERFA_DD2R * (     elp1
                   + ( elp2 * 2.0
                   + ( elp3 * 3.0
                   +   elp4 * 4.0 * t ) * t ) * t );

/* Moon's mean elongation. */
   d = ERFA_DD2R * ((d0
                 + ( d1
                 + ( d2
                 + ( d3
                 +   d4 * t ) * t ) * t ) * t) % (360.0));
   dd = ERFA_DD2R * (     d1
                 + ( d2 * 2.0
                 + ( d3 * 3.0
                 +   d4 * 4.0 * t ) * t ) * t );

/* Sun's mean anomaly. */
   em = ERFA_DD2R * ((em0
                  + ( em1
                  + ( em2
                  + ( em3
                  +   em4 * t ) * t ) * t ) * t) % (360.0));
   dem = ERFA_DD2R * (     em1
                  + ( em2 * 2.0
                  + ( em3 * 3.0
                  +   em4 * 4.0 * t ) * t ) * t );

/* Moon's mean anomaly. */
   emp = ERFA_DD2R * ((emp0
                   + ( emp1
                   + ( emp2
                   + ( emp3
                   +   emp4 * t ) * t ) * t ) * t) % (360.0));
   demp = ERFA_DD2R * (     emp1
                   + ( emp2 * 2.0
                   + ( emp3 * 3.0
                   +   emp4 * 4.0 * t ) * t ) * t );

/* Mean distance of the Moon from its ascending node. */
   f = ERFA_DD2R * ((f0
                 + ( f1
                 + ( f2
                 + ( f3
                 +   f4 * t ) * t ) * t ) * t) % (360.0));
   df = ERFA_DD2R * (     f1
                 + ( f2 * 2.0
                 + ( f3 * 3.0
                 +   f4 * 4.0 * t ) * t ) * t );

/* Meeus further arguments. */
   a1 = ERFA_DD2R * ( a10 + a11*t );
   da1 = ERFA_DD2R * al1;
   a2 = ERFA_DD2R * ( a20 + a21*t );
   da2 = ERFA_DD2R * a21;
   a3 = ERFA_DD2R * ( a30 + a31*t );
   da3 = ERFA_DD2R * a31;

/* E-factor, and square. */
   e = 1.0 + ( e1 + e2*t ) * t;
   de = e1 + 2.0*e2*t;
   esq = e*e;
   desq = 2.0*e*de;

/* Use the Meeus additive terms (deg) to start off the summations. */
   elpmf = elp - f;
   delpmf = delp - df;
   vel = al1 * Math.sin(a1)
       + al2 * Math.sin(elpmf)
       + al3 * Math.sin(a2);
   vdel = al1 * Math.cos(a1) * da1
        + al2 * Math.cos(elpmf) * delpmf
        + al3 * Math.cos(a2) * da2;

   vr = 0.0;
   vdr = 0.0;

   a1mf = a1 - f;
   da1mf = da1 - df;
   a1pf = a1 + f;
   da1pf = da1 + df;
   dlpmp = elp - emp;
   slpmp = elp + emp;
   vb = ab1 * Math.sin(elp)
      + ab2 * Math.sin(a3)
      + ab3 * Math.sin(a1mf)
      + ab4 * Math.sin(a1pf)
      + ab5 * Math.sin(dlpmp)
      + ab6 * Math.sin(slpmp);
   vdb = ab1 * Math.cos(elp) * delp
       + ab2 * Math.cos(a3) * da3
       + ab3 * Math.cos(a1mf) * da1mf
       + ab4 * Math.cos(a1pf) * da1pf
       + ab5 * Math.cos(dlpmp) * (delp-demp)
       + ab6 * Math.cos(slpmp) * (delp+demp);

/* ----------------- */
/* Series expansions */
/* ----------------- */

/* Longitude and distance plus derivatives. */
   for ( n = ~~(NLR-1); n >= 0; n-- ) {
      dn = tlr[n][0];
      emn = ( i = ~~(tlr[n][1] ));
      empn = tlr[n][2];
      fn = tlr[n][3];
      switch ( Math.abs(i) ) {
      case 1:
         en = e;
         den = de;
         break;
      case 2:
         en = esq;
         den = desq;
         break;
      default:
         en = 1.0;
         den = 0.0;
      }
      arg = dn*d + emn*em + empn*emp + fn*f;
      darg = dn*dd + emn*dem + empn*demp + fn*df;
      farg = Math.sin(arg);
      v = farg * en;
      dv = Math.cos(arg)*darg*en + farg*den;
      coeff = tlr[n][4];
      vel += coeff * v;
      vdel += coeff * dv;
      farg = Math.cos(arg);
      v = farg * en;
      dv = -Math.sin(arg)*darg*en + farg*den;
      coeff = tlr[n][5];
      vr += coeff * v;
      vdr += coeff * dv;
   }
   el = elp + ERFA_DD2R*vel;
   del = ( delp + ERFA_DD2R*vdel ) / ERFA_DJC;
   r = ( vr + r0 ) / ERFA_DAU;
   dr = vdr / ERFA_DAU / ERFA_DJC;

/* Latitude plus derivative. */
   for ( n = ~~(NB-1); n >= 0; n-- ) {
      dn = tb[n][0];
      emn = ( i = ~~(tb[n][1] ));
      empn = tb[n][2];
      fn = tb[n][3];
      switch ( Math.abs(i) ) {
      case 1:
         en = e;
         den = de;
         break;
      case 2:
         en = esq;
         den = desq;
         break;
      default:
         en = 1.0;
         den = 0.0;
      }
      arg = dn*d + emn*em + empn*emp + fn*f;
      darg = dn*dd + emn*dem + empn*demp + fn*df;
      farg = Math.sin(arg);
      v = farg * en;
      dv = Math.cos(arg)*darg*en + farg*den;
      coeff = tb[n][4];
      vb += coeff * v;
      vdb += coeff * dv;
   }
   b = vb * ERFA_DD2R;
   db = vdb * ERFA_DD2R / ERFA_DJC;

/* ------------------------------ */
/* Transformation into final form */
/* ------------------------------ */

/* Longitude, latitude to x, y, z (AU). */
   pv = eraS2pv(el, b, r, del, db, dr);

/* IAU 2006 Fukushima-Williams bias+precession angles. */
   (_rv2 = eraPfw06(date1, date2))[0];
   gamb = _rv2[0];
   phib = _rv2[1];
   psib = _rv2[2];
   epsa = _rv2[3];

/* Mean ecliptic coordinates to GCRS rotation matrix. */
   rm = eraIr();
   rm = eraRz(psib, rm);
   rm = eraRx(-phib, rm);
   rm = eraRz(-gamb, rm);

/* Rotate the Moon position and velocity into GCRS (Note 6). */
   pv = eraRxpv(rm, pv);

/* Finished. */

return pv ;
}