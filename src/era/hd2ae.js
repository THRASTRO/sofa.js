function eraHd2ae(ha, dec, phi)
/*
**  - - - - - - - - -
**   e r a H d 2 a e
**  - - - - - - - - -
**
**  Equatorial to horizon coordinates:  transform hour angle and
**  declination to azimuth and altitude.
**
**  Given:
**     ha       double       hour angle (local)
**     dec      double       declination
**     phi      double       site latitude
**
**  Returned:
**     *az      double       azimuth
**     *el      double       altitude (informally, elevation)
**
**  Notes:
**
**  1)  All the arguments are angles in radians.
**
**  2)  Azimuth is returned in the range 0-2pi;  north is zero, and east
**      is +pi/2.  Altitude is returned in the range +/- pi/2.
**
**  3)  The latitude phi is pi/2 minus the angle between the Earth's
**      rotation axis and the adopted zenith.  In many applications it
**      will be sufficient to use the published geodetic latitude of the
**      site.  In very precise (sub-arcsecond) applications, phi can be
**      corrected for polar motion.
**
**  4)  The returned azimuth az is with respect to the rotational north
**      pole, as opposed to the ITRS pole, and for sub-arcsecond
**      accuracy will need to be adjusted for polar motion if it is to
**      be with respect to north on a map of the Earth's surface.
**
**  5)  Should the user wish to work with respect to the astronomical
**      zenith rather than the geodetic zenith, phi will need to be
**      adjusted for deflection of the vertical (often tens of
**      arcseconds), and the zero point of the hour angle ha will also
**      be affected.
**
**  6)  The transformation is the same as Vh = Rz(pi)*Ry(pi/2-phi)*Ve,
**      where Vh and Ve are lefthanded unit vectors in the (az,el) and
**      (ha,dec) systems respectively and Ry and Rz are rotations about
**      first the y-axis and then the z-axis.  (n.b. Rz(pi) simply
**      reverses the signs of the x and y components.)  For efficiency,
**      the algorithm is written out rather than calling other utility
**      functions.  For applications that require even greater
**      efficiency, additional savings are possible if constant terms
**      such as functions of latitude are computed once and for all.
**
**  7)  Again for efficiency, no range checking of arguments is carried
**      out.
**
**  Last revision:   2017 September 12
**
**  ERFA release 2019-07-22
**
**  Copyright (C) 2019 IAU ERFA Board.  See notes at end.
*/
{
   var az = 0.0;;
   var el = 0.0;;


   var sh, ch, sd, cd, sp, cp, x, y, z, r, a;


/* Useful trig functions. */
   sh = Math.sin(ha);
   ch = Math.cos(ha);
   sd = Math.sin(dec);
   cd = Math.cos(dec);
   sp = Math.sin(phi);
   cp = Math.cos(phi);

/* Az,Alt unit vector. */
   x = - ch*cd*sp + sd*cp;
   y = - sh*cd;
   z = ch*cd*cp + sd*sp;

/* To spherical. */
   r = Math.sqrt(x*x + y*y);
   a = (r != 0.0) ? Math.atan2(y,x) : 0.0;
   az = (a < 0.0) ? a+ERFA_D2PI : a;
   el = Math.atan2(z,r);

/* Finished. */

return [az, el];
}