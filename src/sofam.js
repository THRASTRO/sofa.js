/* Pi */
var DPI = 3.141592653589793238462643;

/* 2Pi */
var D2PI = 6.283185307179586476925287;

/* Radians to degrees */
var DR2D = 57.29577951308232087679815;

/* Degrees to radians */
var DD2R = 1.745329251994329576923691e-2;

/* Radians to arcseconds */
var DR2AS = 206264.8062470963551564734;

/* Arcseconds to radians */
var DAS2R = 4.848136811095359935899141e-6;

/* Seconds of time to radians */
var DS2R = 7.272205216643039903848712e-5;

/* Arcseconds in a full circle */
var TURNAS = 1296000.0;

/* Milliarcseconds to radians */
var DMAS2R = DAS2R / 1e3;

/* Length of tropical year B1900 (days) */
var DTY = 365.242198781;

/* Seconds per day. */
var DAYSEC = 86400.0;

/* Days per Julian year */
var DJY = 365.25;

/* Days per Julian century */
var DJC = 36525.0;

/* Days per Julian millennium */
var DJM = 365250.0;

/* Reference epoch = J2000.0;, Julian Date */
var DJ00 = 2451545.0;

/* Julian Date of Modified Julian Date zero */
var DJM0 = 2400000.5;

/* Reference epoch (J2000.0), Modified Julian Date */
var DJM00 = 51544.5;

/* 1977 Jan 1.0 as MJD */
var DJM77 = 43144.0;

/* TT minus TAI (s) */
var TTMTAI = 32.184;

/* Astronomical unit (m) */
var DAU = 149597870e3;

/* Speed of light (m/s) */
var CMPS = 299792458.0;

/* Light time for 1 au (s) */
var AULT = 499.004782;

/* Speed of light (AU per day) */
var DC = DAYSEC / AULT;

/* L_G = 1 - d(TT)/d(TCG) */
var ELG = 6.969290134e-10;

/* L_B = 1 - d(TDB)/d(TCB), and TDB (s) at TAI 1977/1/1.0 */
var ELB = 1.550519768e-8;
var TDB0 = -6.55e-5;

/* Schwarzschild radius of the Sun (au) */
/* = 2 * 1.32712440041e20 / (2.99792458e8)^2 / 1.49597870700e11 */
var SRS = 1.97412574336e-8;

/* dsign(A,B) - magnitude of A with sign of B (double) */
function dsign(A,B) { return ((B)<0.0?-Math.abs(A):Math.abs(A)); }

/* dsign(A,B) - round "up" while ignoring signum (e.g -1.5 to -2) */
function dnint(X) { return X < 0 ? Math.ceil(X-.5) : Math.floor(X+.5); }

/* Reference ellipsoids */
var WGS84 = 1;
var GRS80 = 2;
var WGS72 = 3;

// functions below are directly converted and inlined

/* dint(A) - truncate to nearest whole number towards zero (double) */
// function dint(A) { return ((A)<0.0?Math.ceil(A):Math.floor(A)); }

/* dnint(A) - round to nearest whole number (double) */
// function dnint(A) { return ((A)<0.0?Math.ceil((A)-0.5):Math.floor((A)+0.5)); }

/* max(A,B) - larger (most +ve) of two numbers (generic) */
// function gmax(A,B) { return (((A)>(B))?(A):(B)); }

/* min(A,B) - smaller (least +ve) of two numbers (generic) */
// function gmin(A,B) { return (((A)<(B))?(A):(B)); }

/* float modulo is native in javascript */
// function fmod(A,B) { return (A)%(B); }

/* string compare native in javascript */
// function strcmp(A,B) { return (A) !== (B); }
