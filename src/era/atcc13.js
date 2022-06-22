function eraAtcc13(rc, dc, pr, pd, px, rv, date1, date2)
/*
**  - - - - - - - - - -
**   e r a A t c c 1 3
**  - - - - - - - - - -
**
**  Transform a star's ICRS catalog entry (epoch J2000.0) into ICRS
**  astrometric place.
**
**  Given:
**     rc     double   ICRS right ascension at J2000.0 (radians, Note 1)
**     dc     double   ICRS declination at J2000.0 (radians, Note 1)
**     pr     double   RA proper motion (radians/year, Note 2)
**     pd     double   Dec proper motion (radians/year)
**     px     double   parallax (arcsec)
**     rv     double   radial velocity (km/s, +ve if receding)
**     date1  double   TDB as a 2-part...
**     date2  double   ...Julian Date (Note 3)
**
**  Returned:
**     ra,da  double*  ICRS astrometric RA,Dec (radians)
**
**  Notes:
**
**  1) Star data for an epoch other than J2000.0 (for example from the
**     Hipparcos catalog, which has an epoch of J1991.25) will require a
**     preliminary call to eraPmsafe before use.
**
**  2) The proper motion in RA is dRA/dt rather than cos(Dec)*dRA/dt.
**
**  3) The TDB date date1+date2 is a Julian Date, apportioned in any
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
**  Called:
**     eraApci13    astrometry parameters, ICRS-CIRS, 2013
**     eraAtccq     quick catalog ICRS to astrometric
**
**  This revision:   2021 April 18
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var ra = 0.0;;
   var da = 0.0;;
   var _rv1, _rv2;

/* Star-independent astrometry parameters */
   var astrom = {pmt:0,eb:eraZp(),eh:eraZp(),em:0,v:eraZp(),bm1:0,bpn:eraZr(),along:0,xpl:0,ypl:0,sphi:0,cphi:0,diurab:0,eral:0,refa:0,refb:0};

   var w;


/* The transformation parameters. */
   (_rv1 = eraApci13(date1, date2))[0];
   astrom = _rv1[0];
   w = _rv1[1];

/* Catalog ICRS (epoch J2000.0) to astrometric. */
   (_rv2 = eraAtccq(rc, dc, pr, pd, px, rv, astrom))[0];
   ra = _rv2[0];
   da = _rv2[1];

/* Finished. */

return [ra, da];
}