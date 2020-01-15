# eraEpj2jd

```js
[djm0, djm] = ERFA.epj2jd(epj)
```

Julian Epoch to Julian Date.

## Given:
```
   epj      double    Julian Epoch (e.g. 1996.8)
```

## Returned:
```
   djm0     double    MJD zero-point: always 2400000.5
   djm      double    Modified Julian Date
```

## Note:

```
   The Julian Date is returned in two pieces, in the usual ERFA
   manner, which is designed to preserve time resolution.  The
   Julian Date is available as a single number by adding djm0 and
   djm.
```

## Reference:

   Lieske, J.H., 1979, Astron.Astrophys. 73, 282.

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
