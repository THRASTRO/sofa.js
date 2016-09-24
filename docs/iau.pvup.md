# iauPvup

```js
p = IAU.pvup(dt, pv)
```

Update a pv-vector, discarding the velocity component.

## Given:
```
   dt       double            time interval
   pv       double[2][3]      pv-vector
```

## Returned:
```
   p        double[3]         p-vector
```

## Notes:

1) "Update" means "refer the position component of the vector to a
   new date dt time units from the existing date".

2) The time units of dt must match those of the velocity.

This revision:  2013 June 18

SOFA release 2016-05-03

Copyright (C) 2016 IAU SOFA Board.