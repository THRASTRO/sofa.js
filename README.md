# IAU SOFA JS functions (auto converted)

[Original sources] [3] Copyright (C) 2016 -
[Standards Of Fundamental Astronomy Board
of the International Astronomical Union] [4].

Converted 2016 by Marcel Greter

- The conversion is done by a [custom hacked perl script] [5].
- Automatically generates [QUnit tests] [6] for all functions.

If you encounter problems with this work, please open an
issue on [github](https://github.com/mgreter/sofa.js/issues).

[4]: http://www.iausofa.org/
[6]: https://rawgit.com/mgreter/sofa.js/develop/test/index.html

## Preface

The original SOFA distribution by the IAU SOFA Board consists of 230
C (or Fortran) functions ([SOFA release 2016-05-03] [3]). All function are
converted to JS by a [custom hacked perl script] [5] with a lot of regex magic.
JS and C are surprisingly similar in their basic syntax, if you leave out
most of the C modifiers.

The main obstacles involved:
- Converting structs to objects
- Converting C arrays to JS arrays
- Support C integer calculations

Future SOFA releases may or may not work without modifications to
the converter script. For some cases I took a shortcut and added
specific regular expressions for the correct conversion. The script
is really just a hack that gets the job done. I have no intention
to expand it into a [complete C99 or even C++ to JS converter] [1].

[1]: https://github.com/kripken/emscripten
[3]: http://www.iausofa.org/current_C.html#Downloads
[5]: gen/generate.pl

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
rv = IAU.era00(dj1, dj2);
rc2i = IAU.c2i00a(date1, date2);
[dr, dd] = IAU.g2icrs(dl, db);
```

### C to JS convert example:

Illustrating a function call (stripped down):

```c
int iauJdcalf(int ndp, double dj1, double dj2, int iymdf[4]) {
  /* Convert to Gregorian calendar. */
  js = iauJd2cal(d1, d2, &iymdf[0], &iymdf[1], &iymdf[2], &f);
  iymdf[3] = (int) (f * denom);
  return j;
}
```

```js
function iauJdcalf(ndp, dj1, dj2) {
  var iymdf = [0,0,0,0];
  /* Convert to Gregorian calendar. */
  js = ~~((_rv1 = iauJd2cal(d1, d2))[0]);
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

For each function the converter generates a [C program] [7] that produces
the test data for the unit tests. This is done by calling the original
C functions from the SOFA distribution. This is manually configured in
the converter script for every function, since I needed to control how
many results are generated and over which ranges (fine-tuning needed).

- https://rawgit.com/mgreter/sofa.js/develop/test/index.html

[7]: https://github.com/mgreter/sofa.js/tree/develop/gen/src

## Function list

The list below and the linked documentations are extracted
from the source files provided by the IAU SOFA Board.

### Canonical:

  - [IAU.eform](docs/iau.eform.md) - Earth reference ellipsoids.
  - [IAU.taitt](docs/iau.taitt.md) - International Atomic Time, TAI, to Terrestrial Time, TT.
  - [IAU.taiut1](docs/iau.taiut1.md) - International Atomic Time, TAI, to Universal Time, UT1.
  - [IAU.taiutc](docs/iau.taiutc.md) - International Atomic Time, TAI, to Coordinated Universal Time, UTC.
  - [IAU.tcbtdb](docs/iau.tcbtdb.md) - Barycentric Coordinate Time, TCB, to Barycentric Dynamical Time,...
  - [IAU.tcgtt](docs/iau.tcgtt.md) - Geocentric Coordinate Time, TCG, to Terrestrial Time, TT.
  - [IAU.tdbtcb](docs/iau.tdbtcb.md) - Barycentric Dynamical Time, TDB, to Barycentric Coordinate Time,...
  - [IAU.tdbtt](docs/iau.tdbtt.md) - Barycentric Dynamical Time, TDB, to Terrestrial Time, TT.
  - [IAU.tttai](docs/iau.tttai.md) - Terrestrial Time, TT, to International Atomic Time, TAI.
  - [IAU.tttcg](docs/iau.tttcg.md) - Terrestrial Time, TT, to Geocentric Coordinate Time, TCG.
  - [IAU.tttdb](docs/iau.tttdb.md) - Terrestrial Time, TT, to Barycentric Dynamical Time, TDB.
  - [IAU.ttut1](docs/iau.ttut1.md) - Terrestrial Time, TT, to Universal Time, UT1.
  - [IAU.ut1tai](docs/iau.ut1tai.md) - Universal Time, UT1, to International Atomic Time, TAI.
  - [IAU.ut1tt](docs/iau.ut1tt.md) - Universal Time, UT1, to Terrestrial Time, TT.
  - [IAU.ut1utc](docs/iau.ut1utc.md) - Universal Time, UT1, to Coordinated Universal Time, UTC.
  - [IAU.utctai](docs/iau.utctai.md) - Coordinated Universal Time, UTC, to International Atomic Time, TAI.
  - [IAU.utcut1](docs/iau.utcut1.md) - Coordinated Universal Time, UTC, to Universal Time, UT1.

### Canonical model:

  - [IAU.bi00](docs/iau.bi00.md) - Frame bias components of IAU 2000 precession-nutation models (part...
  - [IAU.bp00](docs/iau.bp00.md) - Frame bias and precession, IAU 2000.
  - [IAU.ee00](docs/iau.ee00.md) - The equation of the equinoxes, compatible with IAU 2000 resolution...
  - [IAU.eect00](docs/iau.eect00.md) - Equation of the equinoxes complementary terms, consistent with I...
  - [IAU.eqeq94](docs/iau.eqeq94.md) - Equation of the equinoxes, IAU 1994 model.
  - [IAU.era00](docs/iau.era00.md) - Earth rotation angle (IAU 2000 model).
  - [IAU.fad03](docs/iau.fad03.md) - Fund'Args IERS(2003): mean elongation of the Moon from the Sun.
  - [IAU.fae03](docs/iau.fae03.md) - Fund'Args IERS(2003): mean longitude of Earth.
  - [IAU.faf03](docs/iau.faf03.md) - Fund'Args IERS(2003): mean longitude of the Moon minus mean longi...
  - [IAU.faju03](docs/iau.faju03.md) - Fund'Args IERS(2003): mean longitude of Jupiter.
  - [IAU.fal03](docs/iau.fal03.md) - Fund'Args IERS(2003): mean anomaly of the Moon.
  - [IAU.falp03](docs/iau.falp03.md) - Fund'Args IERS(2003): mean anomaly of the Sun.
  - [IAU.fama03](docs/iau.fama03.md) - Fund'Args IERS(2003): mean longitude of Mars.
  - [IAU.fame03](docs/iau.fame03.md) - Fund'Args IERS(2003): mean longitude of Mercury.
  - [IAU.fane03](docs/iau.fane03.md) - Fund'Args IERS(2003): mean longitude of Neptune.
  - [IAU.faom03](docs/iau.faom03.md) - Fund'Args IERS(2003): mean longitude of the Moon's ascending node.
  - [IAU.fapa03](docs/iau.fapa03.md) - Fund'Args IERS(2003): general accumulated precession in longitude.
  - [IAU.fasa03](docs/iau.fasa03.md) - Fund'Args IERS(2003): mean longitude of Saturn.
  - [IAU.faur03](docs/iau.faur03.md) - Fund'Args IERS(2003): mean longitude of Uranus.
  - [IAU.fave03](docs/iau.fave03.md) - Fund'Args IERS(2003): mean longitude of Venus.
  - [IAU.gmst00](docs/iau.gmst00.md) - Greenwich mean sidereal time (model consistent with IAU 2000 res...
  - [IAU.gmst06](docs/iau.gmst06.md) - Greenwich mean sidereal time (consistent with IAU 2006 precession).
  - [IAU.gmst82](docs/iau.gmst82.md) - Universal Time to Greenwich mean sidereal time (IAU 1982 model).
  - [IAU.gst00a](docs/iau.gst00a.md) - Greenwich apparent sidereal time (consistent with IAU 2000 resol...
  - [IAU.gst06a](docs/iau.gst06a.md) - Greenwich apparent sidereal time (consistent with IAU 2000 and 2...
  - [IAU.nut00a](docs/iau.nut00a.md) - Nutation, IAU 2000A model (MHB2000 luni-solar and planetary nuta...
  - [IAU.nut00b](docs/iau.nut00b.md) - Nutation, IAU 2000B model.
  - [IAU.nut06a](docs/iau.nut06a.md) - IAU 2000A nutation with adjustments to match the IAU 2006 preces...
  - [IAU.nut80](docs/iau.nut80.md) - Nutation, IAU 1980 model.
  - [IAU.obl06](docs/iau.obl06.md) - Mean obliquity of the ecliptic, IAU 2006 precession model.
  - [IAU.obl80](docs/iau.obl80.md) - Mean obliquity of the ecliptic, IAU 1980 model.
  - [IAU.pfw06](docs/iau.pfw06.md) - Precession angles, IAU 2006 (Fukushima-Williams 4-angle formulati...
  - [IAU.pr00](docs/iau.pr00.md) - Precession-rate part of the IAU 2000 precession-nutation models (p...
  - [IAU.prec76](docs/iau.prec76.md) - IAU 1976 precession model.
  - [IAU.s00](docs/iau.s00.md) - The CIO locator s, positioning the Celestial Intermediate Origin on...
  - [IAU.s06](docs/iau.s06.md) - The CIO locator s, positioning the Celestial Intermediate Origin on...
  - [IAU.sp00](docs/iau.sp00.md) - The TIO locator s', positioning the Terrestrial Intermediate Origi...
  - [IAU.xy06](docs/iau.xy06.md) - X,Y coordinates of celestial intermediate pole from series based o...

### Canonical models:

  - [IAU.p06e](docs/iau.p06e.md) - Precession angles, IAU 2006, equinox based.

### Canonical transformation:

  - [IAU.gc2gd](docs/iau.gc2gd.md) - Transform geocentric coordinates to geodetic using the specified ...
  - [IAU.gd2gc](docs/iau.gd2gc.md) - Transform geodetic coordinates to geocentric using the specified ...

### Support function:

  - [IAU.ab](docs/iau.ab.md) - Apply aberration to transform natural direction into proper direction.
  - [IAU.af2a](docs/iau.af2a.md) - Convert degrees, arcminutes, arcseconds to radians.
  - [IAU.apcg](docs/iau.apcg.md) - For a geocentric observer, prepare star-independent astrometry par...
  - [IAU.apcg13](docs/iau.apcg13.md) - For a geocentric observer, prepare star-independent astrometry p...
  - [IAU.apci](docs/iau.apci.md) - For a terrestrial observer, prepare star-independent astrometry pa...
  - [IAU.apci13](docs/iau.apci13.md) - For a terrestrial observer, prepare star-independent astrometry ...
  - [IAU.apco](docs/iau.apco.md) - For a terrestrial observer, prepare star-independent astrometry pa...
  - [IAU.apco13](docs/iau.apco13.md) - For a terrestrial observer, prepare star-independent astrometry ...
  - [IAU.apcs](docs/iau.apcs.md) - For an observer whose geocentric position and velocity are known, ...
  - [IAU.apcs13](docs/iau.apcs13.md) - For an observer whose geocentric position and velocity are known...
  - [IAU.aper](docs/iau.aper.md) - In the star-independent astrometry parameters, update only the Ear...
  - [IAU.aper13](docs/iau.aper13.md) - In the star-independent astrometry parameters, update only the E...
  - [IAU.apio](docs/iau.apio.md) - For a terrestrial observer, prepare star-independent astrometry pa...
  - [IAU.apio13](docs/iau.apio13.md) - For a terrestrial observer, prepare star-independent astrometry ...
  - [IAU.atci13](docs/iau.atci13.md) - Transform ICRS star data, epoch J2000.0, to CIRS.
  - [IAU.atciq](docs/iau.atciq.md) - Quick ICRS, epoch J2000.0, to CIRS transformation, given precompu...
  - [IAU.atciqn](docs/iau.atciqn.md) - Quick ICRS, epoch J2000.0, to CIRS transformation, given precomp...
  - [IAU.atciqz](docs/iau.atciqz.md) - Quick ICRS to CIRS transformation, given precomputed star- indep...
  - [IAU.atco13](docs/iau.atco13.md) - ICRS RA,Dec to observed place. The caller supplies UTC, site coo...
  - [IAU.atic13](docs/iau.atic13.md) - Transform star RA,Dec from geocentric CIRS to ICRS astrometric.
  - [IAU.aticq](docs/iau.aticq.md) - Quick CIRS RA,Dec to ICRS astrometric place, given the star- inde...
  - [IAU.aticqn](docs/iau.aticqn.md) - Quick CIRS to ICRS astrometric place transformation, given the s...
  - [IAU.atio13](docs/iau.atio13.md) - CIRS RA,Dec to observed place. The caller supplies UTC, site coo...
  - [IAU.atioq](docs/iau.atioq.md) - Quick CIRS to observed place transformation.
  - [IAU.atoc13](docs/iau.atoc13.md) - Observed place at a groundbased site to to ICRS astrometric RA,D...
  - [IAU.atoi13](docs/iau.atoi13.md) - Observed place to CIRS. The caller supplies UTC, site coordinate...
  - [IAU.atoiq](docs/iau.atoiq.md) - Quick observed place to CIRS, given the star-independent astromet...
  - [IAU.bp06](docs/iau.bp06.md) - Frame bias and precession, IAU 2006.
  - [IAU.bpn2xy](docs/iau.bpn2xy.md) - Extract from the bias-precession-nutation matrix the X,Y coordin...
  - [IAU.c2i00a](docs/iau.c2i00a.md) - Form the celestial-to-intermediate matrix for a given date using...
  - [IAU.c2i00b](docs/iau.c2i00b.md) - Form the celestial-to-intermediate matrix for a given date using...
  - [IAU.c2i06a](docs/iau.c2i06a.md) - Form the celestial-to-intermediate matrix for a given date using...
  - [IAU.c2ibpn](docs/iau.c2ibpn.md) - Form the celestial-to-intermediate matrix for a given date given...
  - [IAU.c2ixy](docs/iau.c2ixy.md) - Form the celestial to intermediate-frame-of-date matrix for a giv...
  - [IAU.c2ixys](docs/iau.c2ixys.md) - Form the celestial to intermediate-frame-of-date matrix given th...
  - [IAU.c2t00a](docs/iau.c2t00a.md) - Form the celestial to terrestrial matrix given the date, the UT1...
  - [IAU.c2t00b](docs/iau.c2t00b.md) - Form the celestial to terrestrial matrix given the date, the UT1...
  - [IAU.c2t06a](docs/iau.c2t06a.md) - Form the celestial to terrestrial matrix given the date, the UT1...
  - [IAU.c2tcio](docs/iau.c2tcio.md) - Assemble the celestial to terrestrial matrix from CIO-based comp...
  - [IAU.c2teqx](docs/iau.c2teqx.md) - Assemble the celestial to terrestrial matrix from equinox-based ...
  - [IAU.c2tpe](docs/iau.c2tpe.md) - Form the celestial to terrestrial matrix given the date, the UT1,...
  - [IAU.c2txy](docs/iau.c2txy.md) - Form the celestial to terrestrial matrix given the date, the UT1,...
  - [IAU.cal2jd](docs/iau.cal2jd.md) - Gregorian Calendar to Julian Date.
  - [IAU.d2dtf](docs/iau.d2dtf.md) - Format for output a 2-part Julian Date (or in the case of UTC a q...
  - [IAU.dat](docs/iau.dat.md) - For a given UTC date, calculate delta(AT) = TAI-UTC.
  - [IAU.dtf2d](docs/iau.dtf2d.md) - Encode date and time fields into 2-part Julian Date (or in the ca...
  - [IAU.eceq06](docs/iau.eceq06.md) - Transformation from ecliptic coordinates (mean equinox and eclip...
  - [IAU.ecm06](docs/iau.ecm06.md) - ICRS equatorial to ecliptic rotation matrix, IAU 2006.
  - [IAU.ee00a](docs/iau.ee00a.md) - Equation of the equinoxes, compatible with IAU 2000 resolutions.
  - [IAU.ee00b](docs/iau.ee00b.md) - Equation of the equinoxes, compatible with IAU 2000 resolutions b...
  - [IAU.ee06a](docs/iau.ee06a.md) - Equation of the equinoxes, compatible with IAU 2000 resolutions a...
  - [IAU.eo06a](docs/iau.eo06a.md) - Equation of the origins, IAU 2006 precession and IAU 2000A nutation.
  - [IAU.eors](docs/iau.eors.md) - Equation of the origins, given the classical NPB matrix and the qu...
  - [IAU.epb](docs/iau.epb.md) - Julian Date to Besselian Epoch.
  - [IAU.epb2jd](docs/iau.epb2jd.md) - Besselian Epoch to Julian Date.
  - [IAU.epj](docs/iau.epj.md) - Julian Date to Julian Epoch.
  - [IAU.epj2jd](docs/iau.epj2jd.md) - Julian Epoch to Julian Date.
  - [IAU.epv00](docs/iau.epv00.md) - Earth position and velocity, heliocentric and barycentric, with r...
  - [IAU.eqec06](docs/iau.eqec06.md) - Transformation from ICRS equatorial coordinates to ecliptic coor...
  - [IAU.fk52h](docs/iau.fk52h.md) - Transform FK5 (J2000.0) star data into the Hipparcos system.
  - [IAU.fk5hip](docs/iau.fk5hip.md) - FK5 to Hipparcos rotation and spin.
  - [IAU.fk5hz](docs/iau.fk5hz.md) - Transform an FK5 (J2000.0) star position into the system of the H...
  - [IAU.fw2m](docs/iau.fw2m.md) - Form rotation matrix given the Fukushima-Williams angles.
  - [IAU.fw2xy](docs/iau.fw2xy.md) - CIP X,Y given Fukushima-Williams bias-precession-nutation angles.
  - [IAU.gc2gde](docs/iau.gc2gde.md) - Transform geocentric coordinates to geodetic for a reference ell...
  - [IAU.gd2gce](docs/iau.gd2gce.md) - Transform geodetic coordinates to geocentric for a reference ell...
  - [IAU.gst00b](docs/iau.gst00b.md) - Greenwich apparent sidereal time (consistent with IAU 2000 resol...
  - [IAU.gst06](docs/iau.gst06.md) - Greenwich apparent sidereal time, IAU 2006, given the NPB matrix.
  - [IAU.gst94](docs/iau.gst94.md) - Greenwich apparent sidereal time (consistent with IAU 1982/94 res...
  - [IAU.h2fk5](docs/iau.h2fk5.md) - Transform Hipparcos star data into the FK5 (J2000.0) system.
  - [IAU.hfk5z](docs/iau.hfk5z.md) - Transform a Hipparcos star position into FK5 J2000.0, assuming ze...
  - [IAU.jd2cal](docs/iau.jd2cal.md) - Julian Date to Gregorian year, month, day, and fraction of a day.
  - [IAU.jdcalf](docs/iau.jdcalf.md) - Julian Date to Gregorian Calendar, expressed in a form convenien...
  - [IAU.ld](docs/iau.ld.md) - Apply light deflection by a solar-system body, as part of transformi...
  - [IAU.ldn](docs/iau.ldn.md) - For a star, apply light deflection by multiple solar-system bodies,...
  - [IAU.ldsun](docs/iau.ldsun.md) - Deflection of starlight by the Sun.
  - [IAU.lteceq](docs/iau.lteceq.md) - Transformation from ecliptic coordinates (mean equinox and eclip...
  - [IAU.ltecm](docs/iau.ltecm.md) - ICRS equatorial to ecliptic rotation matrix, long-term.
  - [IAU.lteqec](docs/iau.lteqec.md) - Transformation from ICRS equatorial coordinates to ecliptic coor...
  - [IAU.ltp](docs/iau.ltp.md) - Long-term precession matrix.
  - [IAU.ltpb](docs/iau.ltpb.md) - Long-term precession matrix, including ICRS frame bias.
  - [IAU.ltpecl](docs/iau.ltpecl.md) - Long-term precession of the ecliptic.
  - [IAU.ltpequ](docs/iau.ltpequ.md) - Long-term precession of the equator.
  - [IAU.num00a](docs/iau.num00a.md) - Form the matrix of nutation for a given date, IAU 2000A model.
  - [IAU.num00b](docs/iau.num00b.md) - Form the matrix of nutation for a given date, IAU 2000B model.
  - [IAU.num06a](docs/iau.num06a.md) - Form the matrix of nutation for a given date, IAU 2006/2000A model.
  - [IAU.numat](docs/iau.numat.md) - Form the matrix of nutation.
  - [IAU.nutm80](docs/iau.nutm80.md) - Form the matrix of nutation for a given date, IAU 1980 model.
  - [IAU.pb06](docs/iau.pb06.md) - This function forms three Euler angles which implement general pre...
  - [IAU.plan94](docs/iau.plan94.md) - This function is part of the International Astronomical Union's ...
  - [IAU.pmat00](docs/iau.pmat00.md) - Precession matrix (including frame bias) from GCRS to a specifie...
  - [IAU.pmat06](docs/iau.pmat06.md) - Precession matrix (including frame bias) from GCRS to a specifie...
  - [IAU.pmat76](docs/iau.pmat76.md) - Precession matrix from J2000.0 to a specified date, IAU 1976 model.
  - [IAU.pmpx](docs/iau.pmpx.md) - Proper motion and parallax.
  - [IAU.pmsafe](docs/iau.pmsafe.md) - Star proper motion: update star catalog data for space motion, w...
  - [IAU.pn00](docs/iau.pn00.md) - Precession-nutation, IAU 2000 model: a multi-purpose function, sup...
  - [IAU.pn00a](docs/iau.pn00a.md) - Precession-nutation, IAU 2000A model: a multi-purpose function, s...
  - [IAU.pn00b](docs/iau.pn00b.md) - Precession-nutation, IAU 2000B model: a multi-purpose function, s...
  - [IAU.pn06](docs/iau.pn06.md) - Precession-nutation, IAU 2006 model: a multi-purpose function, sup...
  - [IAU.pn06a](docs/iau.pn06a.md) - Precession-nutation, IAU 2006/2000A models: a multi-purpose funct...
  - [IAU.pnm00a](docs/iau.pnm00a.md) - Form the matrix of precession-nutation for a given date (includi...
  - [IAU.pnm00b](docs/iau.pnm00b.md) - Form the matrix of precession-nutation for a given date (includi...
  - [IAU.pnm06a](docs/iau.pnm06a.md) - Form the matrix of precession-nutation for a given date (includi...
  - [IAU.pnm80](docs/iau.pnm80.md) - Form the matrix of precession/nutation for a given date, IAU 1976...
  - [IAU.pom00](docs/iau.pom00.md) - Form the matrix of polar motion for a given date, IAU 2000.
  - [IAU.pvstar](docs/iau.pvstar.md) - Convert star position+velocity vector to catalog coordinates.
  - [IAU.pvtob](docs/iau.pvtob.md) - Position and velocity of a terrestrial observing station.
  - [IAU.refco](docs/iau.refco.md) - Determine the constants A and B in the atmospheric refraction mod...
  - [IAU.s00a](docs/iau.s00a.md) - The CIO locator s, positioning the Celestial Intermediate Origin o...
  - [IAU.s00b](docs/iau.s00b.md) - The CIO locator s, positioning the Celestial Intermediate Origin o...
  - [IAU.s06a](docs/iau.s06a.md) - The CIO locator s, positioning the Celestial Intermediate Origin o...
  - [IAU.starpm](docs/iau.starpm.md) - Star proper motion: update star catalog data for space motion.
  - [IAU.starpv](docs/iau.starpv.md) - Convert star catalog coordinates to position+velocity vector.
  - [IAU.tf2a](docs/iau.tf2a.md) - Convert hours, minutes, seconds to radians.
  - [IAU.tf2d](docs/iau.tf2d.md) - Convert hours, minutes, seconds to days.
  - [IAU.xys00a](docs/iau.xys00a.md) - For a given TT date, compute the X,Y coordinates of the Celestia...
  - [IAU.xys00b](docs/iau.xys00b.md) - For a given TT date, compute the X,Y coordinates of the Celestia...
  - [IAU.xys06a](docs/iau.xys06a.md) - For a given TT date, compute the X,Y coordinates of the Celestia...

### Support routine:

  - [IAU.dtdb](docs/iau.dtdb.md) - An approximation to TDB-TT, the difference between barycentric dyn...
  - [IAU.g2icrs](docs/iau.g2icrs.md) - Transformation from Galactic Coordinates to ICRS.
  - [IAU.icrs2g](docs/iau.icrs2g.md) - Transformation from ICRS to Galactic Coordinates.

### Vector/matrix support function:

  - [IAU.a2af](docs/iau.a2af.md) - Decompose radians into degrees, arcminutes, arcseconds, fraction.
  - [IAU.a2tf](docs/iau.a2tf.md) - Decompose radians into hours, minutes, seconds, fraction.
  - [IAU.anp](docs/iau.anp.md) - Normalize angle into the range 0 <= a < 2pi.
  - [IAU.anpm](docs/iau.anpm.md) - Normalize angle into the range -pi <= a < +pi.
  - [IAU.c2s](docs/iau.c2s.md) - P-vector to spherical coordinates.
  - [IAU.cp](docs/iau.cp.md) - Copy a p-vector.
  - [IAU.cpv](docs/iau.cpv.md) - Copy a position/velocity vector.
  - [IAU.cr](docs/iau.cr.md) - Copy an r-matrix.
  - [IAU.d2tf](docs/iau.d2tf.md) - Decompose days to hours, minutes, seconds, fraction.
  - [IAU.ir](docs/iau.ir.md) - Initialize an r-matrix to the identity matrix.
  - [IAU.p2pv](docs/iau.p2pv.md) - Extend a p-vector to a pv-vector by appending a zero velocity.
  - [IAU.p2s](docs/iau.p2s.md) - P-vector to spherical polar coordinates.
  - [IAU.pap](docs/iau.pap.md) - Position-angle from two p-vectors.
  - [IAU.pas](docs/iau.pas.md) - Position-angle from spherical coordinates.
  - [IAU.pdp](docs/iau.pdp.md) - p-vector inner (=scalar=dot) product.
  - [IAU.pm](docs/iau.pm.md) - Modulus of p-vector.
  - [IAU.pmp](docs/iau.pmp.md) - P-vector subtraction.
  - [IAU.pn](docs/iau.pn.md) - Convert a p-vector into modulus and unit vector.
  - [IAU.ppp](docs/iau.ppp.md) - P-vector addition.
  - [IAU.ppsp](docs/iau.ppsp.md) - P-vector plus scaled p-vector.
  - [IAU.pv2p](docs/iau.pv2p.md) - Discard velocity component of a pv-vector.
  - [IAU.pv2s](docs/iau.pv2s.md) - Convert position/velocity from Cartesian to spherical coordinates.
  - [IAU.pvdpv](docs/iau.pvdpv.md) - Inner (=scalar=dot) product of two pv-vectors.
  - [IAU.pvm](docs/iau.pvm.md) - Modulus of pv-vector.
  - [IAU.pvmpv](docs/iau.pvmpv.md) - Subtract one pv-vector from another.
  - [IAU.pvppv](docs/iau.pvppv.md) - Add one pv-vector to another.
  - [IAU.pvu](docs/iau.pvu.md) - Update a pv-vector.
  - [IAU.pvup](docs/iau.pvup.md) - Update a pv-vector, discarding the velocity component.
  - [IAU.pvxpv](docs/iau.pvxpv.md) - Outer (=vector=cross) product of two pv-vectors.
  - [IAU.pxp](docs/iau.pxp.md) - p-vector outer (=vector=cross) product.
  - [IAU.rm2v](docs/iau.rm2v.md) - Express an r-matrix as an r-vector.
  - [IAU.rv2m](docs/iau.rv2m.md) - Form the r-matrix corresponding to a given r-vector.
  - [IAU.rx](docs/iau.rx.md) - Rotate an r-matrix about the x-axis.
  - [IAU.rxp](docs/iau.rxp.md) - Multiply a p-vector by an r-matrix.
  - [IAU.rxpv](docs/iau.rxpv.md) - Multiply a pv-vector by an r-matrix.
  - [IAU.rxr](docs/iau.rxr.md) - Multiply two r-matrices.
  - [IAU.ry](docs/iau.ry.md) - Rotate an r-matrix about the y-axis.
  - [IAU.rz](docs/iau.rz.md) - Rotate an r-matrix about the z-axis.
  - [IAU.s2c](docs/iau.s2c.md) - Convert spherical coordinates to Cartesian.
  - [IAU.s2p](docs/iau.s2p.md) - Convert spherical polar coordinates to p-vector.
  - [IAU.s2pv](docs/iau.s2pv.md) - Convert position/velocity from spherical to Cartesian coordinates.
  - [IAU.s2xpv](docs/iau.s2xpv.md) - Multiply a pv-vector by two scalars.
  - [IAU.sepp](docs/iau.sepp.md) - Angular separation between two p-vectors.
  - [IAU.seps](docs/iau.seps.md) - Angular separation between two sets of spherical coordinates.
  - [IAU.sxp](docs/iau.sxp.md) - Multiply a p-vector by a scalar.
  - [IAU.sxpv](docs/iau.sxpv.md) - Multiply a pv-vector by a scalar.
  - [IAU.tr](docs/iau.tr.md) - Transpose an r-matrix.
  - [IAU.trxp](docs/iau.trxp.md) - Multiply a p-vector by the transpose of an r-matrix.
  - [IAU.trxpv](docs/iau.trxpv.md) - Multiply a pv-vector by the transpose of an r-matrix.
  - [IAU.zp](docs/iau.zp.md) - Zero a p-vector.
  - [IAU.zpv](docs/iau.zpv.md) - Zero a pv-vector.
  - [IAU.zr](docs/iau.zr.md) - Initialize an r-matrix to the null matrix.

## License

I created and released this with the best intentions, hoping that I obeyed
all rules set out by the [SOFA Software License] [2]. Since I am no laywer
I'm struggeling a bit with point 3c). The release function names are
without the original 'iau' prefix, but I've put them all under a 'IAU'
namespace in JS. I'm not sure if a strict conversion between languages
already counts as a derivate work, as the intention is to act exactly
the same as the original work (as I tried to assure with the extensive
QUnit test suite). Please open an issue here on github if anybody has
a request to rename either the namespace or the repository. Thanks!

[2]: data/doc/copyr.lis