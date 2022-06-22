# eraPvu

```js
upv = ERFA.pvu(dt, pv)
```

Update a pv-vector.

## Given:
```
   dt       double           time interval
   pv       double[2][3]     pv-vector
```

## Returned:
```
   upv      double[2][3]     p updated, v unchanged
```

## Notes:

1) "Update" means "refer the position component of the vector
   to a new date dt time units from the existing date".

2) The time units of dt must match those of the velocity.

3) It is permissible for pv and upv to be the same array.

## Called:
```
   eraPpsp      p-vector plus scaled p-vector
   eraCp        copy p-vector
```

This revision:  2021 May 11

Copyright (C) 2013-2021, NumFOCUS Foundation.
Derived, with permission, from the SOFA library.
