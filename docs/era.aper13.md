# eraAper13

```js
[astrom, pmt, eb, eh, em, v, bm1, bpn, along, xpl, ypl, sphi, cphi, diurab, eral, refa, refb] = ERFA.aper13(ut11, ut12)
```

In the star-independent astrometry parameters, update only the
Earth rotation angle.  The caller provides UT1, (n.b. not UTC).

## Given:
```
   ut11    double      UT1 as a 2-part...
   ut12    double      ...Julian Date (Note 1)
   astrom  ASTROM*  star-independent astrometry parameters:
    pmt    double       not used
    eb     double[3]    not used
    eh     double[3]    not used
    em     double       not used
    v      double[3]    not used
    bm1    double       not used
    bpn    double[3][3] not used
    along  double       longitude + s' (radians)
    xpl    double       not used
    ypl    double       not used
    sphi   double       not used
    cphi   double       not used
    diurab double       not used
    eral   double       not used
    refa   double       not used
    refb   double       not used
```

## Returned:
```
   astrom  ASTROM*  star-independent astrometry parameters:
    pmt    double       unchanged
    eb     double[3]    unchanged
    eh     double[3]    unchanged
    em     double       unchanged
    v      double[3]    unchanged
    bm1    double       unchanged
    bpn    double[3][3] unchanged
    along  double       unchanged
    xpl    double       unchanged
    ypl    double       unchanged
    sphi   double       unchanged
    cphi   double       unchanged
    diurab double       unchanged
    eral   double       "local" Earth rotation angle (radians)
    refa   double       unchanged
    refb   double       unchanged
```

## Notes:

1) The UT1 date (n.b. not UTC) ut11+ut12 is a Julian Date,
   apportioned in any convenient way between the arguments ut11 and
   ut12.  For example, JD(UT1)=2450123.7 could be expressed in any
   of these ways, among others:

```
          ut11           ut12

       2450123.7           0.0       (JD method)
       2451545.0       -1421.3       (J2000 method)
       2400000.5       50123.2       (MJD method)
       2450123.5           0.2       (date & time method)
```

   The JD method is the most natural and convenient to use in cases
   where the loss of several decimal digits of resolution is
   acceptable.  The J2000 and MJD methods are good compromises
   between resolution and convenience.  The date & time method is
   best matched to the algorithm used:  maximum precision is
   delivered when the ut11 argument is for 0hrs UT1 on the day in
   question and the ut12 argument lies in the range 0 to 1, or vice
   versa.

2) If the caller wishes to provide the Earth rotation angle itself,
   the function [eraAper][1] can be used instead.  One use of this
   technique is to substitute Greenwich apparent sidereal time and
   thereby to support equinox based transformations directly.

3) This is one of several functions that inserts into the astrom
   structure star-independent parameters needed for the chain of
   astrometric transformations ICRS <-> GCRS <-> CIRS <-> observed.

   The various functions support different classes of observer and
   portions of the transformation chain:

```
        functions         observer        transformation

     eraApcg eraApcg13    geocentric      ICRS <-> GCRS
     eraApci eraApci13    terrestrial     ICRS <-> CIRS
     eraApco eraApco13    terrestrial     ICRS <-> observed
     eraApcs eraApcs13    space           ICRS <-> GCRS
     eraAper eraAper13    terrestrial     update Earth rotation
     eraApio eraApio13    terrestrial     CIRS <-> observed
```

   Those with names ending in "13" use contemporary ERFA models to
   compute the various ephemerides.  The others accept ephemerides
   supplied by the caller.

   The transformation from ICRS to GCRS covers space motion,
   parallax, light deflection, and aberration.  From GCRS to CIRS
   comprises frame bias and precession-nutation.  From CIRS to
   observed takes account of Earth rotation, polar motion, diurnal
   aberration and parallax (unless subsumed into the ICRS <-> GCRS
   transformation), and atmospheric refraction.

## Called:
```
   eraAper      astrometry parameters: update ERA
   eraEra00     Earth rotation angle, IAU 2000
```

This revision:   2013 September 25

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.aper.md
