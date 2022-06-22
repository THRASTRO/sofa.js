function eraTpstv(xi, eta, v0)
/*
**  - - - - - - - - -
**   e r a T p s t v
**  - - - - - - - - -
**
**  In the tangent plane projection, given the star's rectangular
**  coordinates and the direction cosines of the tangent point, solve
**  for the direction cosines of the star.
**
**  Given:
**     xi,eta  double     rectangular coordinates of star image (Note 2)
**     v0      double[3]  tangent point's direction cosines
**
**  Returned:
**     v       double[3]  star's direction cosines
**
**  1) The tangent plane projection is also called the "gnomonic
**     projection" and the "central projection".
**
**  2) The eta axis points due north in the adopted coordinate system.
**     If the direction cosines represent observed (RA,Dec), the tangent
**     plane coordinates (xi,eta) are conventionally called the
**     "standard coordinates".  If the direction cosines are with
**     respect to a right-handed triad, (xi,eta) are also right-handed.
**     The units of (xi,eta) are, effectively, radians at the tangent
**     point.
**
**  3) The method used is to complete the star vector in the (xi,eta)
**     based triad and normalize it, then rotate the triad to put the
**     tangent point at the pole with the x-axis aligned to zero
**     longitude.  Writing (a0,b0) for the celestial spherical
**     coordinates of the tangent point, the sequence of rotations is
**     (b-pi/2) around the x-axis followed by (-a-pi/2) around the
**     z-axis.
**
**  4) If vector v0 is not of unit length, the returned vector v will
**     be wrong.
**
**  5) If vector v0 points at a pole, the returned vector v will be
**     based on the arbitrary assumption that the longitude coordinate
**     of the tangent point is zero.
**
**  6) This function is a member of the following set:
**
**         spherical      vector         solve for
**
**         eraTpxes      eraTpxev         xi,eta
**         eraTpsts    > eraTpstv <        star
**         eraTpors      eraTporv         origin
**
**  References:
**
**     Calabretta M.R. & Greisen, E.W., 2002, "Representations of
**     celestial coordinates in FITS", Astron.Astrophys. 395, 1077
**
**     Green, R.M., "Spherical Astronomy", Cambridge University Press,
**     1987, Chapter 13.
**
**  This revision:   2018 January 2
**
**  Copyright (C) 2013-2021, NumFOCUS Foundation.
**  Derived, with permission, from the SOFA library.  See notes at end of file.
*/
{
   var v = [0, 0, 0];;


   var x, y, z, f, r;


/* Tangent point. */
   x = v0[0];
   y = v0[1];
   z = v0[2];

/* Deal with polar case. */
   r = Math.sqrt(x*x + y*y);
   if ( r == 0.0 ) {
      r = 1e-20;
      x = r;
   }

/* Star vector length to tangent plane. */
   f = Math.sqrt(1.0 + xi*xi + eta*eta);

/* Apply the transformation and normalize. */
   v[0] = (x - (xi*y + eta*x*z) / r) / f;
   v[1] = (y + (xi*x - eta*y*z) / r) / f;
   v[2] = (z + eta*r) / f;

/* Finished. */

return v;
}