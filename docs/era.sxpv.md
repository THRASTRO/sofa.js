# eraSxpv

```js
spv = ERFA.sxpv(s, pv)
```

Multiply a pv-vector by a scalar.

## Given:
```
   s       double          scalar
   pv      double[2][3]    pv-vector
```

## Returned:
```
   spv     double[2][3]    s * pv
```

## Note:
```
   It is permissible for pv and spv to be the same array
```

## Called:
```
   eraS2xpv     multiply pv-vector by two scalars
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
