# iauPvu

```js
upv = IAU.pvu(dt, pv)
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
   iauPpsp      p-vector plus scaled p-vector
   iauCp        copy p-vector
```

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.