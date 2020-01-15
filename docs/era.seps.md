# eraSeps

```js
rv = ERFA.seps(al, ap, bl, bp)
```

Angular separation between two sets of spherical coordinates.

## Given:
```
   al     double       first longitude (radians)
   ap     double       first latitude (radians)
   bl     double       second longitude (radians)
   bp     double       second latitude (radians)
```

## Returned (function value):
```
          double       angular separation (radians)
```

## Called:
```
   eraS2c       spherical coordinates to unit vector
   eraSepp      angular separation between two p-vectors
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
