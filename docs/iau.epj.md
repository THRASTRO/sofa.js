# iauEpj

```js
rv = IAU.epj(dj1, dj2)
```

Julian Date to Julian Epoch.

## Given:
```
   dj1,dj2    double     Julian Date (see note)
```

## Returned (function value):
```
              double     Julian Epoch
```

## Note:

```
   The Julian Date is supplied in two pieces, in the usual SOFA
   manner, which is designed to preserve time resolution.  The
   Julian Date is available as a single number by adding dj1 and
   dj2.  The maximum resolution is achieved if dj1 is 2451545.0
   (J2000.0).
```

## Reference:

   Lieske, J.H., 1979, Astron.Astrophys. 73, 282.

This revision:  2013 August 7

SOFA release 2018-01-30

Copyright (C) 2018 IAU SOFA Board.