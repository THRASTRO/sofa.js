# eraPvmpv

```js
amb = ERFA.pvmpv(a, b)
```

Subtract one pv-vector from another.

## Given:
```
   a       double[2][3]      first pv-vector
   b       double[2][3]      second pv-vector
```

## Returned:
```
   amb     double[2][3]      a - b
```

## Note:
```
   It is permissible to re-use the same array for any of the
   arguments.
```

## Called:
```
   eraPmp       p-vector minus p-vector
```

Copyright (C) 2013-2019, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
