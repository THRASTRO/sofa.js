/* Pi */
var ERFA_DPI = 3.141592653589793238462643;

/* 2Pi */
var ERFA_D2PI = 6.283185307179586476925287;

/* Radians to degrees */
var ERFA_DR2D = 57.29577951308232087679815;

/* Degrees to radians */
var ERFA_DD2R = 1.745329251994329576923691e-2;

/* Radians to arcseconds */
var ERFA_DR2AS = 206264.8062470963551564734;

/* Arcseconds to radians */
var ERFA_DAS2R = 4.848136811095359935899141e-6;

/* Seconds of time to radians */
var ERFA_DS2R = 7.272205216643039903848712e-5;

/* Arcseconds in a full circle */
var ERFA_TURNAS = 1296000.0;

/* Milliarcseconds to radians */
var ERFA_DMAS2R = ERFA_DAS2R / 1e3;

/* Length of tropical year B1900 (days) */
var ERFA_DTY = 365.242198781;

/* Seconds per day. */
var ERFA_DAYSEC = 86400.0;

/* Days per Julian year */
var ERFA_DJY = 365.25;

/* Days per Julian century */
var ERFA_DJC = 36525.0;

/* Days per Julian millennium */
var ERFA_DJM = 365250.0;

/* Reference epoch = J2000.0;, Julian Date */
var ERFA_DJ00 = 2451545.0;

/* Julian Date of Modified Julian Date zero */
var ERFA_DJM0 = 2400000.5;

/* Reference epoch (J2000.0), Modified Julian Date */
var ERFA_DJM00 = 51544.5;

/* 1977 Jan 1.0 as MJD */
var ERFA_DJM77 = 43144.0;

/* TT minus TAI (s) */
var ERFA_TTMTAI = 32.184;

/* Astronomical unit (m) */
var ERFA_DAU = 149597870.7e3;

/* Speed of light (m/s) */
var ERFA_CMPS = 299792458.0;

/* Light time for 1 au (s) */
var ERFA_AULT = ERFA_DAU / ERFA_CMPS;

/* Speed of light (AU per day) */
var ERFA_DC = ERFA_DAYSEC / ERFA_AULT;

/* L_G = 1 - d(TT)/d(TCG) */
var ERFA_ELG = 6.969290134e-10;

/* L_B = 1 - d(TDB)/d(TCB), and TDB (s) at TAI 1977/1/1.0 */
var ERFA_ELB = 1.550519768e-8;
var ERFA_TDB0 = -6.55e-5;

/* Schwarzschild radius of the Sun (au) */
/* = 2 * 1.32712440041e20 / (2.99792458e8)^2 / 1.49597870700e11 */
var ERFA_SRS = 1.97412574336e-8;

/* ERFA_DINT(A) - truncate to nearest whole number towards zero (double) */
function ERFA_DINT(X) { return X < 0 ? Math.ceil(X) : Math.floor(X); }

/* ERFA_DNINT(A) - round to nearest whole number (double) */
function ERFA_DNINT(X) { return X < 0 ? Math.ceil(X-.5) : Math.floor(X+.5); }

/* ERFA_DSIGN(A,B) - magnitude of A with sign of B (double) */
function ERFA_DSIGN(A,B) { return ((B)<0.0?-Math.abs(A):Math.abs(A)); }

/* Reference ellipsoids */
var ERFA_WGS84 = 1;
var ERFA_GRS80 = 2;
var ERFA_WGS72 = 3;

/* Dates and Delta(AT)s */
var ERFA_LEAPSEC = [
    [ 1960,  1,  1.4178180 ],
    [ 1961,  1,  1.4228180 ],
    [ 1961,  8,  1.3728180 ],
    [ 1962,  1,  1.8458580 ],
    [ 1963, 11,  1.9458580 ],
    [ 1964,  1,  3.2401300 ],
    [ 1964,  4,  3.3401300 ],
    [ 1964,  9,  3.4401300 ],
    [ 1965,  1,  3.5401300 ],
    [ 1965,  3,  3.6401300 ],
    [ 1965,  7,  3.7401300 ],
    [ 1965,  9,  3.8401300 ],
    [ 1966,  1,  4.3131700 ],
    [ 1968,  2,  4.2131700 ],
    [ 1972,  1, 10.0       ],
    [ 1972,  7, 11.0       ],
    [ 1973,  1, 12.0       ],
    [ 1974,  1, 13.0       ],
    [ 1975,  1, 14.0       ],
    [ 1976,  1, 15.0       ],
    [ 1977,  1, 16.0       ],
    [ 1978,  1, 17.0       ],
    [ 1979,  1, 18.0       ],
    [ 1980,  1, 19.0       ],
    [ 1981,  7, 20.0       ],
    [ 1982,  7, 21.0       ],
    [ 1983,  7, 22.0       ],
    [ 1985,  7, 23.0       ],
    [ 1988,  1, 24.0       ],
    [ 1990,  1, 25.0       ],
    [ 1991,  1, 26.0       ],
    [ 1992,  7, 27.0       ],
    [ 1993,  7, 28.0       ],
    [ 1994,  7, 29.0       ],
    [ 1996,  1, 30.0       ],
    [ 1997,  7, 31.0       ],
    [ 1999,  1, 32.0       ],
    [ 2006,  1, 33.0       ],
    [ 2009,  1, 34.0       ],
    [ 2012,  7, 35.0       ],
    [ 2015,  7, 36.0       ],
    [ 2017,  1, 37.0       ]
];

/* Release year for eraDat */
var ERFA_IYV = 2019;

/* Epsilon for double floats */
var DBL_EPSILON = Number.EPSILON;
