function eraLdsun(p, e, em)
/*
**  - - - - - - - - -
**   e r a L d s u n
**  - - - - - - - - -
**
**  Deflection of starlight by the Sun.
**
**  Given:
**     p      double[3]  direction from observer to star (unit vector)
**     e      double[3]  direction from Sun to observer (unit vector)
**     em     double     distance from Sun to observer (au)
**
**  Returned:
**     p1     double[3]  observer to deflected star (unit vector)
**
**  Notes:
**
**  1) The source is presumed to be sufficiently distant that its
**     directions seen from the Sun and the observer are essentially
**     the same.
**
**  2) The deflection is restrained when the angle between the star and
**     the center of the Sun is less than a threshold value, falling to
**     zero deflection for zero separation.  The chosen threshold value
**     is within the solar limb for all solar-system applications, and
**     is about 5 arcminutes for the case of a terrestrial observer.
**
**  3) The arguments p and p1 can be the same array.
**
**  Called:
**     eraLd        light deflection by a solar-system body
**
**  This revision:   2016 June 16
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var p1 = [0, 0, 0];;


   var em2, dlim;


/* Deflection limiter (smaller for distant observers). */
   em2 = em*em;
   if ( em2 < 1.0 ) em2 = 1.0;
   dlim = 1e-6 / (em2 > 1.0 ? em2 : 1.0);

/* Apply the deflection. */
   p1 = eraLd(1.0, p, p, e, em, dlim);

/* Finished. */

return p1;
}