function eraApcs(date1, date2, pv, ebpv, ehp, astrom)
/*
**  - - - - - - - -
**   e r a A p c s
**  - - - - - - - -
**
**  For an observer whose geocentric position and velocity are known,
**  prepare star-independent astrometry parameters for transformations
**  between ICRS and GCRS.  The Earth ephemeris is supplied by the
**  caller.
**
**  The parameters produced by this function are required in the space
**  motion, parallax, light deflection and aberration parts of the
**  astrometric transformation chain.
**
**  Given:
**     date1  double       TDB as a 2-part...
**     date2  double       ...Julian Date (Note 1)
**     pv     double[2][3] observer's geocentric pos/vel (m, m/s)
**     ebpv   double[2][3] Earth barycentric PV (au, au/day)
**     ehp    double[3]    Earth heliocentric P (au)
**
**  Returned:
**     astrom eraASTROM*   star-independent astrometry parameters:
**      pmt    double       PM time interval (SSB, Julian years)
**      eb     double[3]    SSB to observer (vector, au)
**      eh     double[3]    Sun to observer (unit vector)
**      em     double       distance from Sun to observer (au)
**      v      double[3]    barycentric observer velocity (vector, c)
**      bm1    double       sqrt(1-|v|^2): reciprocal of Lorenz factor
**      bpn    double[3][3] bias-precession-nutation matrix
**      along  double       unchanged
**      xpl    double       unchanged
**      ypl    double       unchanged
**      sphi   double       unchanged
**      cphi   double       unchanged
**      diurab double       unchanged
**      eral   double       unchanged
**      refa   double       unchanged
**      refb   double       unchanged
**
**  Notes:
**
**  1) The TDB date date1+date2 is a Julian Date, apportioned in any
**     convenient way between the two arguments.  For example,
**     JD(TDB)=2450123.7 could be expressed in any of these ways, among
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
**     good compromises between resolution and convenience.  For most
**     applications of this function the choice will not be at all
**     critical.
**
**     TT can be used instead of TDB without any significant impact on
**     accuracy.
**
**  2) All the vectors are with respect to BCRS axes.
**
**  3) Providing separate arguments for (i) the observer's geocentric
**     position and velocity and (ii) the Earth ephemeris is done for
**     convenience in the geocentric, terrestrial and Earth orbit cases.
**     For deep space applications it maybe more convenient to specify
**     zero geocentric position and velocity and to supply the
**     observer's position and velocity information directly instead of
**     with respect to the Earth.  However, note the different units:
**     m and m/s for the geocentric vectors, au and au/day for the
**     heliocentric and barycentric vectors.
**
**  4) In cases where the caller does not wish to provide the Earth
**     ephemeris, the function eraApcs13 can be used instead of the
**     present function.  This computes the Earth ephemeris using the
**     ERFA function eraEpv00.
**
**  5) This is one of several functions that inserts into the astrom
**     structure star-independent parameters needed for the chain of
**     astrometric transformations ICRS <-> GCRS <-> CIRS <-> observed.
**
**     The various functions support different classes of observer and
**     portions of the transformation chain:
**
**          functions         observer        transformation
**
**       eraApcg eraApcg13    geocentric      ICRS <-> GCRS
**       eraApci eraApci13    terrestrial     ICRS <-> CIRS
**       eraApco eraApco13    terrestrial     ICRS <-> observed
**       eraApcs eraApcs13    space           ICRS <-> GCRS
**       eraAper eraAper13    terrestrial     update Earth rotation
**       eraApio eraApio13    terrestrial     CIRS <-> observed
**
**     Those with names ending in "13" use contemporary ERFA models to
**     compute the various ephemerides.  The others accept ephemerides
**     supplied by the caller.
**
**     The transformation from ICRS to GCRS covers space motion,
**     parallax, light deflection, and aberration.  From GCRS to CIRS
**     comprises frame bias and precession-nutation.  From CIRS to
**     observed takes account of Earth rotation, polar motion, diurnal
**     aberration and parallax (unless subsumed into the ICRS <-> GCRS
**     transformation), and atmospheric refraction.
**
**  6) The context structure astrom produced by this function is used by
**     eraAtciq* and eraAticq*.
**
**  Called:
**     eraCp        copy p-vector
**     eraPm        modulus of p-vector
**     eraPn        decompose p-vector into modulus and direction
**     eraIr        initialize r-matrix to identity
**
**  Copyright (C) 2013-2019, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   if (typeof astrom == 'undefined') {
      astrom = {pmt:0,eb:eraZp(),eh:eraZp(),em:0,v:eraZp(),bm1:0,bpn:eraZr(),along:0,xpl:0,ypl:0,sphi:0,cphi:0,diurab:0,eral:0,refa:0,refb:0};
   }   var _rv2;

/* au/d to m/s */
   var AUDMS = ERFA_DAU/ERFA_DAYSEC;

/* Light time for 1 au (day) */
   var CR = ERFA_AULT/ERFA_DAYSEC;

   var i;
   var dp, dv, pb = [], vb = [], ph = [], v2, w;


/* Time since reference epoch, years (for proper motion calculation). */
   astrom.pmt = ( (date1 - ERFA_DJ00) + date2 ) / ERFA_DJY;

/* Adjust Earth ephemeris to observer. */
   for (i = 0; i < 3; i++) {
      dp = pv[0][i] / ERFA_DAU;
      dv = pv[1][i] / AUDMS;
      pb[i] = ebpv[0][i] + dp;
      vb[i] = ebpv[1][i] + dv;
      ph[i] = ehp[i] + dp;
   }

/* Barycentric position of observer (au). */
   astrom.eb = eraCp(pb);

/* Heliocentric direction and distance (unit vector and au). */
   (_rv2 = eraPn(ph))[0];
   astrom.em = _rv2[0];
   astrom.eh = _rv2[1];

/* Barycentric vel. in units of c, and reciprocal of Lorenz factor. */
   v2 = 0.0;
   for (i = 0; i < 3; i++) {
      w = vb[i] * CR;
      astrom.v[i] = w;
      v2 += w*w;
   }
   astrom.bm1 = Math.sqrt(1.0 - v2);

/* Reset the NPB matrix. */
   astrom.bpn = eraIr();

/* Finished. */

return astrom;
}