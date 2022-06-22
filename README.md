# ERFA/SOFA JS functions (auto converted)

This JS library is a conversion from [liberfa][1] (by [NumFOCUS Foundation][2]),
which is in turn a derived work from [IAU SOFA][3] (by [Standards Of
Fundamental Astronomy Board of the International Astronomical Union][4]).

Converted 2022-06-23 by Marcel Greter (Version 2.0.0 / RELEASE 20210512).

- The conversion is done by a [custom hacked perl script][5].
- Automatically generates [QUnit tests][6] for all functions.

If you encounter problems with this work, please open an
issue on [github](https://github.com/mgreter/sofa.js/issues).

[1]: https://github.com/liberfa/erfa
[2]: https://numfocus.org/
[3]: http://www.iausofa.org/
[4]: https://www.iau.org/
[5]: gen/generate.pl
[6]: https://rawgit.com/mgreter/sofa.js/develop/test/index.html

## Preface

The original SOFA distribution by the IAU SOFA Board consists of 244
C (or Fortran) functions ([SOFA release 15 2019-07-22][3]). But we use
ERFA instead, which it is a direct derivate under a more permissive license.
All function are converted to JS by a [custom hacked perl script][5] with
a lot of regex magic. JS and C are surprisingly similar in their basic syntax,
if you leave out most of the C modifiers.

The main obstacles involved:
- Converting structs to objects
- Converting C arrays to JS arrays
- Support C integer calculations

Future ERFA/SOFA releases may or may not work without modifications to
the converter script. For some cases I took a shortcut and added
specific regular expressions for the correct conversion. The script
is really just a hack that gets the job done. I have no intention
to expand it into a [complete C99 or even C++ to JS converter][7].

[7]: https://github.com/kripken/emscripten

## How does it work

```html
<script src="dist/sofa.min.js"></script>
```

Due to fundamental differences between C and JS I had to adopt the
way how output values work. The original C functions use pointers to
doubles or integers to be filled by the invoked function. JS doesn't
have a directly equivalent feature. We could pass an array or object
to be altered by the invoked function. But I opted to return an array
directly with all output values (if more than one is returned).

Output values consist of the C function return value (ignored if the
C function return type is void) and all values passed as pointers to
the C function (structs are handled the same). The return from the JS
function is not wrapped in an array if there is only one output value
(either the return value from the C function or one "pointer" value).

### Usage Examples:
```js
rv = ERFA.era00(dj1, dj2);
rc2i = ERFA.c2i00a(date1, date2);
[dr, dd] = ERFA.g2icrs(dl, db);
```

### C to JS convert example:

Illustrating a function call (stripped down):

```c
int eraJdcalf(int ndp, double dj1, double dj2, int iymdf[4]) {
  /* Convert to Gregorian calendar. */
  js = eraJd2cal(d1, d2, &iymdf[0], &iymdf[1], &iymdf[2], &f);
  iymdf[3] = (int) (f * denom);
  return j;
}
```

```js
function eraJdcalf(ndp, dj1, dj2) {
  var iymdf = [0,0,0,0];
  /* Convert to Gregorian calendar. */
  js = ~~((_rv1 = eraJd2cal(d1, d2))[0]);
  iymdf[0] = _rv1[1];
  iymdf[1] = _rv1[2];
  iymdf[2] = _rv1[3];
  f = _rv1[4];
  iymdf[3] = ~~(f * denom);
  return [ j, iymdf ];
}
```

## Value types

There are only a few value types beside the primitives (int, double) and
the more complex struct "objects". All of them map nicely to JS arrays
(V3, MAT33) or JS objects (ASTROM, LDBODY). Following a few examples
of how the most basic types are mapped between C and JS:

```
v3[3] => [ 0, 0, 0 ]
pv3[2][3] => [ v3, v3 ]
mat33[3][3] => [ v3, v3, v3 ]
```

## QUnit tests

For each function the converter generates a [C program][7] that produces
the test data for the unit tests. This is done by calling the original
C functions from the SOFA distribution. This is manually configured in
the converter script for every function, since I needed to control how
many results are generated and over which ranges (fine-tuning needed).

- https://rawgit.com/mgreter/sofa.js/develop/test/index.html

[7]: https://github.com/mgreter/sofa.js/tree/develop/gen/src

## Function list

The list below and the linked documentations are extracted
from the ERFA source files provided by NumFOCUS Foundation.

### Canonical:

  - [ERFA.eform](docs/era.eform.md) - Earth reference ellipsoids.
  - [ERFA.taitt](docs/era.taitt.md) - International Atomic Time, TAI, to Terrestrial Time, TT.
  - [ERFA.taiut1](docs/era.taiut1.md) - International Atomic Time, TAI, to Universal Time, UT1.
  - [ERFA.taiutc](docs/era.taiutc.md) - International Atomic Time, TAI, to Coordinated Universal Time, UTC.
  - [ERFA.tcbtdb](docs/era.tcbtdb.md) - Barycentric Coordinate Time, TCB, to Barycentric Dynamical Time,...
  - [ERFA.tcgtt](docs/era.tcgtt.md) - Geocentric Coordinate Time, TCG, to Terrestrial Time, TT.
  - [ERFA.tdbtcb](docs/era.tdbtcb.md) - Barycentric Dynamical Time, TDB, to Barycentric Coordinate Time,...
  - [ERFA.tdbtt](docs/era.tdbtt.md) - Barycentric Dynamical Time, TDB, to Terrestrial Time, TT.
  - [ERFA.tttai](docs/era.tttai.md) - Terrestrial Time, TT, to International Atomic Time, TAI.
  - [ERFA.tttcg](docs/era.tttcg.md) - Terrestrial Time, TT, to Geocentric Coordinate Time, TCG.
  - [ERFA.tttdb](docs/era.tttdb.md) - Terrestrial Time, TT, to Barycentric Dynamical Time, TDB.
  - [ERFA.ttut1](docs/era.ttut1.md) - Terrestrial Time, TT, to Universal Time, UT1.
  - [ERFA.ut1tai](docs/era.ut1tai.md) - Universal Time, UT1, to International Atomic Time, TAI.
  - [ERFA.ut1tt](docs/era.ut1tt.md) - Universal Time, UT1, to Terrestrial Time, TT.
  - [ERFA.ut1utc](docs/era.ut1utc.md) - Universal Time, UT1, to Coordinated Universal Time, UTC.
  - [ERFA.utctai](docs/era.utctai.md) - Coordinated Universal Time, UTC, to International Atomic Time, TAI.
  - [ERFA.utcut1](docs/era.utcut1.md) - Coordinated Universal Time, UTC, to Universal Time, UT1.

### Canonical model:

  - [ERFA.bi00](docs/era.bi00.md) - Frame bias components of IAU 2000 precession-nutation models (part...
  - [ERFA.bp00](docs/era.bp00.md) - Frame bias and precession, IAU 2000.
  - [ERFA.ee00](docs/era.ee00.md) - The equation of the equinoxes, compatible with IAU 2000 resolution...
  - [ERFA.eect00](docs/era.eect00.md) - Equation of the equinoxes complementary terms, consistent with I...
  - [ERFA.eqeq94](docs/era.eqeq94.md) - Equation of the equinoxes, IAU 1994 model.
  - [ERFA.era00](docs/era.era00.md) - Earth rotation angle (IAU 2000 model).
  - [ERFA.fad03](docs/era.fad03.md) - Fund'Args IERS(2003): mean elongation of the Moon from the Sun.
  - [ERFA.fae03](docs/era.fae03.md) - Fund'Args IERS(2003): mean longitude of Earth.
  - [ERFA.faf03](docs/era.faf03.md) - Fund'Args IERS(2003): mean longitude of the Moon minus mean longi...
  - [ERFA.faju03](docs/era.faju03.md) - Fund'Args IERS(2003): mean longitude of Jupiter.
  - [ERFA.fal03](docs/era.fal03.md) - Fund'Args IERS(2003): mean anomaly of the Moon.
  - [ERFA.falp03](docs/era.falp03.md) - Fund'Args IERS(2003): mean anomaly of the Sun.
  - [ERFA.fama03](docs/era.fama03.md) - Fund'Args IERS(2003): mean longitude of Mars.
  - [ERFA.fame03](docs/era.fame03.md) - Fund'Args IERS(2003): mean longitude of Mercury.
  - [ERFA.fane03](docs/era.fane03.md) - Fund'Args IERS(2003): mean longitude of Neptune.
  - [ERFA.faom03](docs/era.faom03.md) - Fund'Args IERS(2003): mean longitude of the Moon's ascending node.
  - [ERFA.fapa03](docs/era.fapa03.md) - Fund'Args IERS(2003): general accumulated precession in longitude.
  - [ERFA.fasa03](docs/era.fasa03.md) - Fund'Args IERS(2003): mean longitude of Saturn.
  - [ERFA.faur03](docs/era.faur03.md) - Fund'Args IERS(2003): mean longitude of Uranus.
  - [ERFA.fave03](docs/era.fave03.md) - Fund'Args IERS(2003): mean longitude of Venus.
  - [ERFA.gmst00](docs/era.gmst00.md) - Greenwich mean sidereal time (model consistent with IAU 2000 res...
  - [ERFA.gmst06](docs/era.gmst06.md) - Greenwich mean sidereal time (consistent with IAU 2006 precession).
  - [ERFA.gmst82](docs/era.gmst82.md) - Universal Time to Greenwich mean sidereal time (IAU 1982 model).
  - [ERFA.gst00a](docs/era.gst00a.md) - Greenwich apparent sidereal time (consistent with IAU 2000 resol...
  - [ERFA.gst06a](docs/era.gst06a.md) - Greenwich apparent sidereal time (consistent with IAU 2000 and 2...
  - [ERFA.nut00a](docs/era.nut00a.md) - Nutation, IAU 2000A model (MHB2000 luni-solar and planetary nuta...
  - [ERFA.nut00b](docs/era.nut00b.md) - Nutation, IAU 2000B model.
  - [ERFA.nut06a](docs/era.nut06a.md) - IAU 2000A nutation with adjustments to match the IAU 2006 preces...
  - [ERFA.nut80](docs/era.nut80.md) - Nutation, IAU 1980 model.
  - [ERFA.obl06](docs/era.obl06.md) - Mean obliquity of the ecliptic, IAU 2006 precession model.
  - [ERFA.obl80](docs/era.obl80.md) - Mean obliquity of the ecliptic, IAU 1980 model.
  - [ERFA.pfw06](docs/era.pfw06.md) - Precession angles, IAU 2006 (Fukushima-Williams 4-angle formulati...
  - [ERFA.pr00](docs/era.pr00.md) - Precession-rate part of the IAU 2000 precession-nutation models (p...
  - [ERFA.prec76](docs/era.prec76.md) - IAU 1976 precession model.
  - [ERFA.s00](docs/era.s00.md) - The CIO locator s, positioning the Celestial Intermediate Origin on...
  - [ERFA.s06](docs/era.s06.md) - The CIO locator s, positioning the Celestial Intermediate Origin on...
  - [ERFA.sp00](docs/era.sp00.md) - The TIO locator s', positioning the Terrestrial Intermediate Origi...
  - [ERFA.xy06](docs/era.xy06.md) - X,Y coordinates of celestial intermediate pole from series based o...

### Canonical models:

  - [ERFA.p06e](docs/era.p06e.md) - Precession angles, IAU 2006, equinox based.

### Canonical transformation:

  - [ERFA.gc2gd](docs/era.gc2gd.md) - Transform geocentric coordinates to geodetic using the specified ...
  - [ERFA.gd2gc](docs/era.gd2gc.md) - Transform geodetic coordinates to geocentric using the specified ...

### Support function:

  - [ERFA.ab](docs/era.ab.md) - Apply aberration to transform natural direction into proper direction.
  - [ERFA.ae2hd](docs/era.ae2hd.md) - Horizon to equatorial coordinates: transform azimuth and altitude...
  - [ERFA.af2a](docs/era.af2a.md) - Convert degrees, arcminutes, arcseconds to radians.
  - [ERFA.apcg](docs/era.apcg.md) - For a geocentric observer, prepare star-independent astrometry par...
  - [ERFA.apcg13](docs/era.apcg13.md) - For a geocentric observer, prepare star-independent astrometry p...
  - [ERFA.apci](docs/era.apci.md) - For a terrestrial observer, prepare star-independent astrometry pa...
  - [ERFA.apci13](docs/era.apci13.md) - For a terrestrial observer, prepare star-independent astrometry ...
  - [ERFA.apco](docs/era.apco.md) - For a terrestrial observer, prepare star-independent astrometry pa...
  - [ERFA.apco13](docs/era.apco13.md) - For a terrestrial observer, prepare star-independent astrometry ...
  - [ERFA.apcs](docs/era.apcs.md) - For an observer whose geocentric position and velocity are known, ...
  - [ERFA.apcs13](docs/era.apcs13.md) - For an observer whose geocentric position and velocity are known...
  - [ERFA.aper](docs/era.aper.md) - In the star-independent astrometry parameters, update only the Ear...
  - [ERFA.aper13](docs/era.aper13.md) - In the star-independent astrometry parameters, update only the E...
  - [ERFA.apio](docs/era.apio.md) - For a terrestrial observer, prepare star-independent astrometry pa...
  - [ERFA.apio13](docs/era.apio13.md) - For a terrestrial observer, prepare star-independent astrometry ...
  - [ERFA.atci13](docs/era.atci13.md) - Transform ICRS star data, epoch J2000.0, to CIRS.
  - [ERFA.atciq](docs/era.atciq.md) - Quick ICRS, epoch J2000.0, to CIRS transformation, given precompu...
  - [ERFA.atciqn](docs/era.atciqn.md) - Quick ICRS, epoch J2000.0, to CIRS transformation, given precomp...
  - [ERFA.atciqz](docs/era.atciqz.md) - Quick ICRS to CIRS transformation, given precomputed star- indep...
  - [ERFA.atco13](docs/era.atco13.md) - ICRS RA,Dec to observed place. The caller supplies UTC, site coo...
  - [ERFA.atic13](docs/era.atic13.md) - Transform star RA,Dec from geocentric CIRS to ICRS astrometric.
  - [ERFA.aticq](docs/era.aticq.md) - Quick CIRS RA,Dec to ICRS astrometric place, given the star- inde...
  - [ERFA.aticqn](docs/era.aticqn.md) - Quick CIRS to ICRS astrometric place transformation, given the s...
  - [ERFA.atio13](docs/era.atio13.md) - CIRS RA,Dec to observed place. The caller supplies UTC, site coo...
  - [ERFA.atioq](docs/era.atioq.md) - Quick CIRS to observed place transformation.
  - [ERFA.atoc13](docs/era.atoc13.md) - Observed place at a groundbased site to to ICRS astrometric RA,D...
  - [ERFA.atoi13](docs/era.atoi13.md) - Observed place to CIRS. The caller supplies UTC, site coordinate...
  - [ERFA.atoiq](docs/era.atoiq.md) - Quick observed place to CIRS, given the star-independent astromet...
  - [ERFA.bp06](docs/era.bp06.md) - Frame bias and precession, IAU 2006.
  - [ERFA.bpn2xy](docs/era.bpn2xy.md) - Extract from the bias-precession-nutation matrix the X,Y coordin...
  - [ERFA.c2i00a](docs/era.c2i00a.md) - Form the celestial-to-intermediate matrix for a given date using...
  - [ERFA.c2i00b](docs/era.c2i00b.md) - Form the celestial-to-intermediate matrix for a given date using...
  - [ERFA.c2i06a](docs/era.c2i06a.md) - Form the celestial-to-intermediate matrix for a given date using...
  - [ERFA.c2ibpn](docs/era.c2ibpn.md) - Form the celestial-to-intermediate matrix for a given date given...
  - [ERFA.c2ixy](docs/era.c2ixy.md) - Form the celestial to intermediate-frame-of-date matrix for a giv...
  - [ERFA.c2ixys](docs/era.c2ixys.md) - Form the celestial to intermediate-frame-of-date matrix given th...
  - [ERFA.c2t00a](docs/era.c2t00a.md) - Form the celestial to terrestrial matrix given the date, the UT1...
  - [ERFA.c2t00b](docs/era.c2t00b.md) - Form the celestial to terrestrial matrix given the date, the UT1...
  - [ERFA.c2t06a](docs/era.c2t06a.md) - Form the celestial to terrestrial matrix given the date, the UT1...
  - [ERFA.c2tcio](docs/era.c2tcio.md) - Assemble the celestial to terrestrial matrix from CIO-based comp...
  - [ERFA.c2teqx](docs/era.c2teqx.md) - Assemble the celestial to terrestrial matrix from equinox-based ...
  - [ERFA.c2tpe](docs/era.c2tpe.md) - Form the celestial to terrestrial matrix given the date, the UT1,...
  - [ERFA.c2txy](docs/era.c2txy.md) - Form the celestial to terrestrial matrix given the date, the UT1,...
  - [ERFA.cal2jd](docs/era.cal2jd.md) - Gregorian Calendar to Julian Date.
  - [ERFA.d2dtf](docs/era.d2dtf.md) - Format for output a 2-part Julian Date (or in the case of UTC a q...
  - [ERFA.dat](docs/era.dat.md) - For a given UTC date, calculate Delta(AT) = TAI-UTC.
  - [ERFA.dtf2d](docs/era.dtf2d.md) - Encode date and time fields into 2-part Julian Date (or in the ca...
  - [ERFA.eceq06](docs/era.eceq06.md) - Transformation from ecliptic coordinates (mean equinox and eclip...
  - [ERFA.ecm06](docs/era.ecm06.md) - ICRS equatorial to ecliptic rotation matrix, IAU 2006.
  - [ERFA.ee00a](docs/era.ee00a.md) - Equation of the equinoxes, compatible with IAU 2000 resolutions.
  - [ERFA.ee00b](docs/era.ee00b.md) - Equation of the equinoxes, compatible with IAU 2000 resolutions b...
  - [ERFA.ee06a](docs/era.ee06a.md) - Equation of the equinoxes, compatible with IAU 2000 resolutions a...
  - [ERFA.eo06a](docs/era.eo06a.md) - Equation of the origins, IAU 2006 precession and IAU 2000A nutation.
  - [ERFA.eors](docs/era.eors.md) - Equation of the origins, given the classical NPB matrix and the qu...
  - [ERFA.epb](docs/era.epb.md) - Julian Date to Besselian Epoch.
  - [ERFA.epb2jd](docs/era.epb2jd.md) - Besselian Epoch to Julian Date.
  - [ERFA.epj](docs/era.epj.md) - Julian Date to Julian Epoch.
  - [ERFA.epj2jd](docs/era.epj2jd.md) - Julian Epoch to Julian Date.
  - [ERFA.epv00](docs/era.epv00.md) - Earth position and velocity, heliocentric and barycentric, with r...
  - [ERFA.eqec06](docs/era.eqec06.md) - Transformation from ICRS equatorial coordinates to ecliptic coor...
  - [ERFA.fk425](docs/era.fk425.md) - Convert B1950.0 FK4 star catalog data to J2000.0 FK5.
  - [ERFA.fk45z](docs/era.fk45z.md) - Convert a B1950.0 FK4 star position to J2000.0 FK5, assuming zero...
  - [ERFA.fk524](docs/era.fk524.md) - Convert J2000.0 FK5 star catalog data to B1950.0 FK4.
  - [ERFA.fk52h](docs/era.fk52h.md) - Transform FK5 (J2000.0) star data into the Hipparcos system.
  - [ERFA.fk54z](docs/era.fk54z.md) - Convert a J2000.0 FK5 star position to B1950.0 FK4, assuming zero...
  - [ERFA.fk5hip](docs/era.fk5hip.md) - FK5 to Hipparcos rotation and spin.
  - [ERFA.fk5hz](docs/era.fk5hz.md) - Transform an FK5 (J2000.0) star position into the system of the H...
  - [ERFA.fw2m](docs/era.fw2m.md) - Form rotation matrix given the Fukushima-Williams angles.
  - [ERFA.fw2xy](docs/era.fw2xy.md) - CIP X,Y given Fukushima-Williams bias-precession-nutation angles.
  - [ERFA.gc2gde](docs/era.gc2gde.md) - Transform geocentric coordinates to geodetic for a reference ell...
  - [ERFA.gd2gce](docs/era.gd2gce.md) - Transform geodetic coordinates to geocentric for a reference ell...
  - [ERFA.gst00b](docs/era.gst00b.md) - Greenwich apparent sidereal time (consistent with IAU 2000 resol...
  - [ERFA.gst06](docs/era.gst06.md) - Greenwich apparent sidereal time, IAU 2006, given the NPB matrix.
  - [ERFA.gst94](docs/era.gst94.md) - Greenwich apparent sidereal time (consistent with IAU 1982/94 res...
  - [ERFA.h2fk5](docs/era.h2fk5.md) - Transform Hipparcos star data into the FK5 (J2000.0) system.
  - [ERFA.hd2ae](docs/era.hd2ae.md) - Equatorial to horizon coordinates: transform hour angle and decli...
  - [ERFA.hd2pa](docs/era.hd2pa.md) - Parallactic angle for a given hour angle and declination.
  - [ERFA.hfk5z](docs/era.hfk5z.md) - Transform a Hipparcos star position into FK5 J2000.0, assuming ze...
  - [ERFA.jd2cal](docs/era.jd2cal.md) - Julian Date to Gregorian year, month, day, and fraction of a day.
  - [ERFA.jdcalf](docs/era.jdcalf.md) - Julian Date to Gregorian Calendar, expressed in a form convenien...
  - [ERFA.ld](docs/era.ld.md) - Apply light deflection by a solar-system body, as part of transformi...
  - [ERFA.ldn](docs/era.ldn.md) - For a star, apply light deflection by multiple solar-system bodies,...
  - [ERFA.ldsun](docs/era.ldsun.md) - Deflection of starlight by the Sun.
  - [ERFA.lteceq](docs/era.lteceq.md) - Transformation from ecliptic coordinates (mean equinox and eclip...
  - [ERFA.ltecm](docs/era.ltecm.md) - ICRS equatorial to ecliptic rotation matrix, long-term.
  - [ERFA.lteqec](docs/era.lteqec.md) - Transformation from ICRS equatorial coordinates to ecliptic coor...
  - [ERFA.ltp](docs/era.ltp.md) - Long-term precession matrix.
  - [ERFA.ltpb](docs/era.ltpb.md) - Long-term precession matrix, including ICRS frame bias.
  - [ERFA.ltpecl](docs/era.ltpecl.md) - Long-term precession of the ecliptic.
  - [ERFA.ltpequ](docs/era.ltpequ.md) - Long-term precession of the equator.
  - [ERFA.num00a](docs/era.num00a.md) - Form the matrix of nutation for a given date, IAU 2000A model.
  - [ERFA.num00b](docs/era.num00b.md) - Form the matrix of nutation for a given date, IAU 2000B model.
  - [ERFA.num06a](docs/era.num06a.md) - Form the matrix of nutation for a given date, IAU 2006/2000A model.
  - [ERFA.numat](docs/era.numat.md) - Form the matrix of nutation.
  - [ERFA.nutm80](docs/era.nutm80.md) - Form the matrix of nutation for a given date, IAU 1980 model.
  - [ERFA.pb06](docs/era.pb06.md) - This function forms three Euler angles which implement general pre...
  - [ERFA.plan94](docs/era.plan94.md) - Approximate heliocentric position and velocity of a nominated ma...
  - [ERFA.pmat00](docs/era.pmat00.md) - Precession matrix (including frame bias) from GCRS to a specifie...
  - [ERFA.pmat06](docs/era.pmat06.md) - Precession matrix (including frame bias) from GCRS to a specifie...
  - [ERFA.pmat76](docs/era.pmat76.md) - Precession matrix from J2000.0 to a specified date, IAU 1976 model.
  - [ERFA.pmpx](docs/era.pmpx.md) - Proper motion and parallax.
  - [ERFA.pmsafe](docs/era.pmsafe.md) - Star proper motion: update star catalog data for space motion, w...
  - [ERFA.pn00](docs/era.pn00.md) - Precession-nutation, IAU 2000 model: a multi-purpose function, sup...
  - [ERFA.pn00a](docs/era.pn00a.md) - Precession-nutation, IAU 2000A model: a multi-purpose function, s...
  - [ERFA.pn00b](docs/era.pn00b.md) - Precession-nutation, IAU 2000B model: a multi-purpose function, s...
  - [ERFA.pn06](docs/era.pn06.md) - Precession-nutation, IAU 2006 model: a multi-purpose function, sup...
  - [ERFA.pn06a](docs/era.pn06a.md) - Precession-nutation, IAU 2006/2000A models: a multi-purpose funct...
  - [ERFA.pnm00a](docs/era.pnm00a.md) - Form the matrix of precession-nutation for a given date (includi...
  - [ERFA.pnm00b](docs/era.pnm00b.md) - Form the matrix of precession-nutation for a given date (includi...
  - [ERFA.pnm06a](docs/era.pnm06a.md) - Form the matrix of precession-nutation for a given date (includi...
  - [ERFA.pnm80](docs/era.pnm80.md) - Form the matrix of precession/nutation for a given date, IAU 1976...
  - [ERFA.pom00](docs/era.pom00.md) - Form the matrix of polar motion for a given date, IAU 2000.
  - [ERFA.pvstar](docs/era.pvstar.md) - Convert star position+velocity vector to catalog coordinates.
  - [ERFA.pvtob](docs/era.pvtob.md) - Position and velocity of a terrestrial observing station.
  - [ERFA.refco](docs/era.refco.md) - Determine the constants A and B in the atmospheric refraction mod...
  - [ERFA.s00a](docs/era.s00a.md) - The CIO locator s, positioning the Celestial Intermediate Origin o...
  - [ERFA.s00b](docs/era.s00b.md) - The CIO locator s, positioning the Celestial Intermediate Origin o...
  - [ERFA.s06a](docs/era.s06a.md) - The CIO locator s, positioning the Celestial Intermediate Origin o...
  - [ERFA.starpm](docs/era.starpm.md) - Star proper motion: update star catalog data for space motion.
  - [ERFA.starpv](docs/era.starpv.md) - Convert star catalog coordinates to position+velocity vector.
  - [ERFA.tf2a](docs/era.tf2a.md) - Convert hours, minutes, seconds to radians.
  - [ERFA.tf2d](docs/era.tf2d.md) - Convert hours, minutes, seconds to days.
  - [ERFA.tpors](docs/era.tpors.md) - In tangent plane, given the rectangular coordinates of a star and...
  - [ERFA.tporv](docs/era.tporv.md) - In tangent plane, given the rectangular coordinates of a star and...
  - [ERFA.tpsts](docs/era.tpsts.md) - In tangent plane, given the star's rectangular coordinates and th...
  - [ERFA.tpstv](docs/era.tpstv.md) - In tangent plane, given the star's rectangular coordinates and th...
  - [ERFA.tpxes](docs/era.tpxes.md) - In tangent plane, given celestial spherical coordinates for a sta...
  - [ERFA.tpxev](docs/era.tpxev.md) - In tangent plane, given celestial direction cosines for a star an...
  - [ERFA.xys00a](docs/era.xys00a.md) - For a given TT date, compute the X,Y coordinates of the Celestia...
  - [ERFA.xys00b](docs/era.xys00b.md) - For a given TT date, compute the X,Y coordinates of the Celestia...
  - [ERFA.xys06a](docs/era.xys06a.md) - For a given TT date, compute the X,Y coordinates of the Celestia...

### Support routine:

  - [ERFA.dtdb](docs/era.dtdb.md) - An approximation to TDB-TT, the difference between barycentric dyn...
  - [ERFA.g2icrs](docs/era.g2icrs.md) - Transformation from Galactic Coordinates to ICRS.
  - [ERFA.icrs2g](docs/era.icrs2g.md) - Transformation from ICRS to Galactic Coordinates.

### Vector/matrix support function:

  - [ERFA.a2af](docs/era.a2af.md) - Decompose radians into degrees, arcminutes, arcseconds, fraction.
  - [ERFA.a2tf](docs/era.a2tf.md) - Decompose radians into hours, minutes, seconds, fraction.
  - [ERFA.anp](docs/era.anp.md) - Normalize angle into the range 0 <= a < 2pi.
  - [ERFA.anpm](docs/era.anpm.md) - Normalize angle into the range -pi <= a < +pi.
  - [ERFA.c2s](docs/era.c2s.md) - P-vector to spherical coordinates.
  - [ERFA.cp](docs/era.cp.md) - Copy a p-vector.
  - [ERFA.cpv](docs/era.cpv.md) - Copy a position/velocity vector.
  - [ERFA.cr](docs/era.cr.md) - Copy an r-matrix.
  - [ERFA.d2tf](docs/era.d2tf.md) - Decompose days to hours, minutes, seconds, fraction.
  - [ERFA.ir](docs/era.ir.md) - Initialize an r-matrix to the identity matrix.
  - [ERFA.p2pv](docs/era.p2pv.md) - Extend a p-vector to a pv-vector by appending a zero velocity.
  - [ERFA.p2s](docs/era.p2s.md) - P-vector to spherical polar coordinates.
  - [ERFA.pap](docs/era.pap.md) - Position-angle from two p-vectors.
  - [ERFA.pas](docs/era.pas.md) - Position-angle from spherical coordinates.
  - [ERFA.pdp](docs/era.pdp.md) - p-vector inner (=scalar=dot) product.
  - [ERFA.pm](docs/era.pm.md) - Modulus of p-vector.
  - [ERFA.pmp](docs/era.pmp.md) - P-vector subtraction.
  - [ERFA.pn](docs/era.pn.md) - Convert a p-vector into modulus and unit vector.
  - [ERFA.ppp](docs/era.ppp.md) - P-vector addition.
  - [ERFA.ppsp](docs/era.ppsp.md) - P-vector plus scaled p-vector.
  - [ERFA.pv2p](docs/era.pv2p.md) - Discard velocity component of a pv-vector.
  - [ERFA.pv2s](docs/era.pv2s.md) - Convert position/velocity from Cartesian to spherical coordinates.
  - [ERFA.pvdpv](docs/era.pvdpv.md) - Inner (=scalar=dot) product of two pv-vectors.
  - [ERFA.pvm](docs/era.pvm.md) - Modulus of pv-vector.
  - [ERFA.pvmpv](docs/era.pvmpv.md) - Subtract one pv-vector from another.
  - [ERFA.pvppv](docs/era.pvppv.md) - Add one pv-vector to another.
  - [ERFA.pvu](docs/era.pvu.md) - Update a pv-vector.
  - [ERFA.pvup](docs/era.pvup.md) - Update a pv-vector, discarding the velocity component.
  - [ERFA.pvxpv](docs/era.pvxpv.md) - Outer (=vector=cross) product of two pv-vectors.
  - [ERFA.pxp](docs/era.pxp.md) - p-vector outer (=vector=cross) product.
  - [ERFA.rm2v](docs/era.rm2v.md) - Express an r-matrix as an r-vector.
  - [ERFA.rv2m](docs/era.rv2m.md) - Form the r-matrix corresponding to a given r-vector.
  - [ERFA.rx](docs/era.rx.md) - Rotate an r-matrix about the x-axis.
  - [ERFA.rxp](docs/era.rxp.md) - Multiply a p-vector by an r-matrix.
  - [ERFA.rxpv](docs/era.rxpv.md) - Multiply a pv-vector by an r-matrix.
  - [ERFA.rxr](docs/era.rxr.md) - Multiply two r-matrices.
  - [ERFA.ry](docs/era.ry.md) - Rotate an r-matrix about the y-axis.
  - [ERFA.rz](docs/era.rz.md) - Rotate an r-matrix about the z-axis.
  - [ERFA.s2c](docs/era.s2c.md) - Convert spherical coordinates to Cartesian.
  - [ERFA.s2p](docs/era.s2p.md) - Convert spherical polar coordinates to p-vector.
  - [ERFA.s2pv](docs/era.s2pv.md) - Convert position/velocity from spherical to Cartesian coordinates.
  - [ERFA.s2xpv](docs/era.s2xpv.md) - Multiply a pv-vector by two scalars.
  - [ERFA.sepp](docs/era.sepp.md) - Angular separation between two p-vectors.
  - [ERFA.seps](docs/era.seps.md) - Angular separation between two sets of spherical coordinates.
  - [ERFA.sxp](docs/era.sxp.md) - Multiply a p-vector by a scalar.
  - [ERFA.sxpv](docs/era.sxpv.md) - Multiply a pv-vector by a scalar.
  - [ERFA.tr](docs/era.tr.md) - Transpose an r-matrix.
  - [ERFA.trxp](docs/era.trxp.md) - Multiply a p-vector by the transpose of an r-matrix.
  - [ERFA.trxpv](docs/era.trxpv.md) - Multiply a pv-vector by the transpose of an r-matrix.
  - [ERFA.zp](docs/era.zp.md) - Zero a p-vector.
  - [ERFA.zpv](docs/era.zpv.md) - Zero a pv-vector.
  - [ERFA.zr](docs/era.zr.md) - Initialize an r-matrix to the null matrix.

## License

[This work is released under the same terms][8] as [erfa][9].

[8]: LICENSE.txt
[9]: https://github.com/liberfa/erfa/blob/master/LICENSE