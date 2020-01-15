# eraAper

```js
[astrom, pmt, eb, eh, em, v, bm1, bpn, along, xpl, ypl, sphi, cphi, diurab, eral, refa, refb] = ERFA.aper(theta, astrom)
```

In the star-independent astrometry parameters, update only the
Earth rotation angle, supplied by the caller explicitly.

## Given:
```
   theta   double      Earth rotation angle (radians, Note 2)
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

1) This function exists to enable sidereal-tracking applications to
   avoid wasteful recomputation of the bulk of the astrometry
   parameters:  only the Earth rotation is updated.

2) For targets expressed as equinox based positions, such as
   classical geocentric apparent (RA,Dec), the supplied theta can be
   Greenwich apparent sidereal time rather than Earth rotation
   angle.

3) The function [eraAper13][1] can be used instead of the present
   function, and starts from UT1 rather than ERA itself.

4) This is one of several functions that inserts into the astrom
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

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.


[1]: era.aper13.md
