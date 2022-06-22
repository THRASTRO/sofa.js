# eraP2pv

```js
pv = ERFA.p2pv(p)
```

Extend a p-vector to a pv-vector by appending a zero velocity.

## Given:
```
   p        double[3]       p-vector
```

## Returned:
```
   pv       double[2][3]    pv-vector
```

## Called:
```
   eraCp        copy p-vector
   eraZp        zero p-vector
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
