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

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
