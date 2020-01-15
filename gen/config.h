#include <stdio.h>
#include <stdint.h>

static const char* tscale[2] = {
	"TAI", "UTC"
};

static const char* tcoordt[3] = {
	"R", "H", "A"
};

static const eraLDBODY lbodys[4] = {
	{ 1.0       , 6e-6 , { { 0.0, 0.0, 0.0 }, { 0.0, 0.0, 0.0 } }, }, // sun
	{ 0.00095435, 3e-9 , { { 0.0, 0.0, 0.0 }, { 0.0, 0.0, 0.0 } }, }, // jup
	{ 0.00028574, 3e-10, { { 0.0, 0.0, 0.0 }, { 0.0, 0.0, 0.0 } }, }, // sat
	{ 0.00028574, 3e-10, { { 0.0, 0.0, 0.0 }, { 0.0, 0.0, 0.0 } }, }, // sat
};

static const eraASTROM astroms[] = {
	{
		1.0, { 0.1, 1.0, 0.0 }, { 0.0, 0.0, 0.0 }, 0.1, { 0.0, 0.0, 0.0 }, 1.0,
		{ { 0.3, 0.2, 0.4 }, { 0.0, 1.0, 0.0 }, { 0.0, 1.0, 0.0 } },
		0.0, 0.1, 0.5, 0.0, 0.0,  1.0, 0.0, 0.0, 1.0,
	},
	{
		0.0, { 1.0, 0.3, 0.0 }, { 0.0, 0.0, 0.0 }, 0.3, { 0.0, 0.0, 0.1 }, 0.0,
		{ { 0.0, 0.0, 0.0 }, { 0.0, 0.0, 0.0 }, { 0.0, 0.0, 0.0 } },
		0.0, 0.0, 0.2, 0.3, 0.0,  0.0, 1.0, 0.0, 0.0,
	},
	{
		0.1, { 0.0, 0.0, 1.0 }, { 0.0, 0.1, 0.0 }, 0.1, { 0.0, 0.1, 0.0 }, 1.0,
		{ { 0.0, 0.0, 0.5 }, { 0.4, 0.0, 0.2 }, { 0.0, 0.0, 0.0 } },
		0.1, 1.0, 0.0, 0.0, 0.0,  0.0, 0.1, 0.0, 0.0,
	},
	{
		0.3, { 0.1, 0.1, 1.0 }, { 1.0, 0.2, 0.1 }, 0.3, { 0.03, 0.2, 0.02 }, 0.1,
		{ { 0.5, 1.0, 0.6 }, { 1.0, 0.0, 0.3 }, { 0.01, 0.2, 0.1 } },
		0.2, 0.1, 0.03, 1.0, 0.2,  0.1, 0.1, 1.0, 0.7,
	}
};
/*
**      pmt    var       PM time interval (SSB, Julian years)
**      eb     double[3]    SSB to observer (vector, au)
**      eh     double[3]    Sun to observer (unit vector)
**      em     var       distance from Sun to observer (au)
**      v      double[3]    barycentric observer velocity (vector, c)
**      bm1    var       Math.sqrt(1-|v|^2): reciprocal of Lorenz factor
**      bpn    double[3][3] bias-precession-nutation matrix
**      along  var       longitude + s' (radians)
**      xpl    var       polar motion xp wrt local meridian (radians)
**      ypl    var       polar motion yp wrt local meridian (radians)
**      sphi   var       sine of geodetic latitude
**      cphi   var       cosine of geodetic latitude
**      diurab var       magnitude of diurnal aberration vector
**      eral   var       "local" Earth rotation angle (radians)
**      refa   var       refraction constant A (radians)
**      refb   var       refraction constant B (radians)
*/

static const double d_t = 7750.0;
static const double beg_t = 2451545.0 - 7750.0 * 100.0;
static const double end_t = 2451545.0 + 7750.0 * 100.0;

static const double d_ts = 7750.0;
static const double beg_ts = 2451545.0 - 7750.0 * 5.0;
static const double end_ts = 2451545.0 + 7750.0 * 5.0;

static const double d_a = 180 / 24.0;
static const double beg_a = - 180;
static const double end_a = + 180;

static const double d_sa = 180 / 2.0;
static const double beg_sa = - 180;
static const double end_sa = + 180;

static const double d_ba = 10000 / 24.0;
static const double beg_ba = - 10000;
static const double end_ba = + 10000;

static const double d_res = 1.0;
static const double beg_res = -4.0;
static const double end_res = 4.0;

static const double d_days = 36.0;
static const double beg_days = 0.0 - 36.0 * 5.0;
static const double end_days = 0.0 + 36.0 * 5.0;

static const char beg_sign = '+';
static const char end_sign = '-';
static const char d_sign = '-' - '+';

static const double beg_double = - 1.73333 * 0.0 - 1;
static const double end_double = + 1.73333 * 1.0 - 1;
static const double d_double = 1.73333;
/*

**     b    eraLDBODY[n]  data for each of the n bodies (Notes 1,2):
**      bm   double         mass of the body (solar masses, Note 3)
**      dl   double         deflection limiter (Note 4)
**      pv   [2][3]         barycentric PV of the body (au, 	au/day)
*/

void exportV2(double v[3]) {
	printf("[ %0.24e, %0.24e ]",
		v[0], v[1]);
}

void exportV3(double v[3]) {
	printf("[ %0.24e, %0.24e, %0.24e ]",
		v[0], v[1], v[2]);
}

void exportDMSF(int v[3]) {
	printf("[ %0d, %d, %d, %d ]",
		v[0], v[1], v[2], v[3]);
}

void exportPV3(double pv[2][3]) {
	printf("[");
	exportV3(pv[0]);
	printf(", ");
	exportV3(pv[1]);
	printf("]");
}

void exportMAT33(double pv[3][3]) {
	printf("[");
	exportV3(pv[0]);
	printf(", ");
	exportV3(pv[1]);
	printf(", ");
	exportV3(pv[2]);
	printf("]");
}

/*
**  astrom eraASTROM* star-independent astrometry parameters:
**   pmt    double       PM time interval (SSB, Julian years)
**   eb     double[3]    SSB to observer (vector, au)
**   eh     double[3]    Sun to observer (unit vector)
**   em     double       distance from Sun to observer (au)
**   v      double[3]    barycentric observer velocity (vector, c)
**   bm1    double       sqrt(1-|v|^2): reciprocal of Lorenz factor
**   bpn    double[3][3] bias-precession-nutation matrix
**   along  double       longitude + s' (radians)
**   xpl    double       polar motion xp wrt local meridian (radians)
**   ypl    double       polar motion yp wrt local meridian (radians)
**   sphi   double       sine of geodetic latitude
**   cphi   double       cosine of geodetic latitude
**   diurab double       magnitude of diurnal aberration vector
**   eral   double       "local" Earth rotation angle (radians)
**   refa   double       refraction constant A (radians)
**   refb   double       refraction constant B (radians)
*/
void exportASTROM(eraASTROM astrom) {
	printf("{ ");
	printf("pmt: %.24e, ", astrom.pmt);
	printf("eb: ");
	exportV3(astrom.eb);
	printf(", ");
	printf("eh: ");
	exportV3(astrom.eh);
	printf(", ");
	printf("em: %.24e, ", astrom.em);
	printf("v: ");
	exportV3(astrom.v);
	printf(", ");
	printf("bm1: %.24e, ", astrom.bm1);
	printf("bpn: ");
	exportMAT33(astrom.bpn);
	printf(", ");
	printf("along: %.24e, ", astrom.along);
	printf("xpl: %.24e, ", astrom.xpl);
	printf("ypl: %.24e, ", astrom.ypl);
	printf("sphi: %.24e, ", astrom.sphi);
	printf("cphi: %.24e, ", astrom.cphi);
	printf("diurab: %.24e, ", astrom.diurab);
	printf("eral: %.24e, ", astrom.eral);
	printf("refa: %.24e, ", astrom.refa);
	printf("refb: %.24e", astrom.refb);
	printf("}");
}

/*
**  b     eraLDBODY[n] data for each of the n bodies (Notes 3,4):
**   bm    double       mass of the body (solar masses, Note 5)
**   dl    double       deflection limiter (Note 6)
**   pv    [2][3]       barycentric PV of the body (au, au/day)
*/
void exportLBODY(eraLDBODY ldbody) {
	printf("{ ");
	printf("bm: %.24e, ", ldbody.bm);
	printf("dl: %.24e, ", ldbody.dl);
	printf("pv: ");
	exportPV3(ldbody.pv);
	printf("}");
}

void exportLDBODY(int n, eraLDBODY ldbody[]) {
	int i;
	printf("[ ");
	for(i = 0; i < n; i++) {
		exportLBODY(ldbody[i]);
		if (i + 1 < n) {
			printf(", ");
		}
	}
	printf("]");
}

