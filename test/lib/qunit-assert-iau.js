(function(factory) {

	// NOTE:
	// All techniques except for the "browser globals" fallback will extend the
	// provided QUnit object but return the isolated API methods

	// For AMD: Register as an anonymous AMD module with a named dependency on "qunit".
	if (typeof define === "function" && define.amd) {
		define(["qunit"], factory);
	}
	// For Node.js
	else if (typeof module !== "undefined" && module && module.exports && typeof require === "function") {
		module.exports = factory(require("qunitjs"));
	}
	// For CommonJS with `exports`, but without `module.exports`, like Rhino
	else if (typeof exports !== "undefined" && exports && typeof require === "function") {
		var qunit = require("qunitjs");
		qunit.extend(exports, factory(qunit));
	}
	// For browser globals
	else {
		factory(QUnit);
	}

}(function(QUnit) {

	'use strict';

	function assertINT(has, exp, eps, msg) {
		if (isNaN(has) && isNaN(exp)) {
			QUnit.assert.pushResult({
				result: true,
				actual: has,
				expected: exp,
				message: msg
			});
		} else {
			QUnit.assert.close.percent(has, exp, eps, msg);
		}
	}
	function assertDBL(has, exp, eps, msg) {
		if (isNaN(has) && isNaN(exp)) {
			QUnit.assert.pushResult({
				result: true,
				actual: has,
				expected: exp,
				message: msg
			});
		} else {
			QUnit.assert.close.percent(has, exp, eps, msg);
		}
	}
	function assertV2(has, exp, eps, msg) {
		QUnit.assert.ok(has, msg + " (is V2)");
		QUnit.assert.DBL(has[0], exp[0], eps, msg + " (x)");
		QUnit.assert.DBL(has[1], exp[1], eps, msg + " (y)");
	}
	function assertV3(has, exp, eps, msg) {
		QUnit.assert.ok(has, msg + " (is V3)");
		QUnit.assert.ok(exp, msg + " (expect V3)");
		QUnit.assert.DBL(has[0], exp[0], eps, msg + " (x)");
		QUnit.assert.DBL(has[1], exp[1], eps, msg + " (y)");
		QUnit.assert.DBL(has[2], exp[2], eps, msg + " (z)");
	}
	function assertDMSF(has, exp, eps, msg) {
		QUnit.assert.DBL(has[0], exp[0], eps, msg + " (day)");
		QUnit.assert.DBL(has[1], exp[1], eps, msg + " (min)");
		QUnit.assert.DBL(has[2], exp[2], eps, msg + " (sec)");
		QUnit.assert.DBL(has[3], exp[3], eps, msg + " (frac)");
	}
	function assertPV3(has, exp, eps, msg) {
		if (exp && has && exp[0] && has[0] && exp[1] && has[1]) {
			QUnit.assert.DBL(has[0][0], exp[0][0], eps, msg + " (p.x)");
			QUnit.assert.DBL(has[0][1], exp[0][1], eps, msg + " (p.y)");
			QUnit.assert.DBL(has[0][2], exp[0][2], eps, msg + " (p.z)");
			QUnit.assert.DBL(has[1][0], exp[1][0], eps, msg + " (v.x)");
			QUnit.assert.DBL(has[1][1], exp[1][1], eps, msg + " (v.y)");
			QUnit.assert.DBL(has[1][2], exp[1][2], eps, msg + " (v.z)");
		} else {
			QUnit.assert.ok(has, " has V3");
			QUnit.assert.ok(exp, " expect V3");
			QUnit.assert.ok(has[0], " has [0]V3");
			QUnit.assert.ok(exp[0], " expect [0]V3");
			QUnit.assert.ok(has[1], " has [1]V3");
			QUnit.assert.ok(exp[1], " expect [1]V3");
		}
	}
	function assertMAT3(has, exp, eps, msg) {
		QUnit.assert.DBL(has[0], exp[0], eps, msg + "[0]");
		QUnit.assert.DBL(has[1], exp[1], eps, msg + "[1]");
		QUnit.assert.DBL(has[2], exp[2], eps, msg + "[2]");
	}
	function assertMAT33(has, exp, eps, msg) {
		QUnit.assert.ok(has[0], msg + " (MAT3[0])");
		QUnit.assert.ok(has[1], msg + " (MAT3[1])");
		QUnit.assert.ok(has[2], msg + " (MAT3[2])");
		QUnit.assert.ok(exp[0], msg + " (MAT3[0])");
		QUnit.assert.ok(exp[1], msg + " (MAT3[1])");
		QUnit.assert.ok(exp[2], msg + " (MAT3[2])");
		QUnit.assert.MAT3(has[0], exp[0], eps, msg + " [0]");
		QUnit.assert.MAT3(has[1], exp[1], eps, msg + " [1]");
		QUnit.assert.MAT3(has[2], exp[2], eps, msg + " [2]");
	}

	function assertOBJECT(has, exp, eps, msg, tst) {
		var i = 0; while (i < tst.length) {
			var name = tst[i++], type = tst[i++];
			QUnit.assert[type](has[name], exp[name],
				eps, msg + " (" + name + ")");
		}
	}

	function assertASTROM(has, exp, eps, msg)
	{
		QUnit.assert.OBJECT(has, exp, eps, msg, [
			'pmt', 'DBL',    // PM time interval (SSB, Julian years)
			'eb', 'V3',      // SSB to observer (vector, au)
			'eh', 'V3',      // Sun to observer (unit vector)
			'em', 'DBL',     // distance from Sun to observer (au)
			'v', 'V3',       // barycentric observer velocity (vector, c)
			'bm1', 'DBL',    // sqrt(1-|v|^2): reciprocal of Lorenz factor
			'bpn', 'MAT33',  // bias-precession-nutation matrix
			'along', 'DBL',  // longitude + s' (radians)
			'xpl', 'DBL',    // polar motion xp wrt local meridian (radians)
			'ypl', 'DBL',    // polar motion yp wrt local meridian (radians)
			'sphi', 'DBL',   // sine of geodetic latitude
			'cphi', 'DBL',   // cosine of geodetic latitude
			'diurab', 'DBL', // magnitude of diurnal aberration vector
			'eral', 'DBL',   // "local" Earth rotation angle (radians)
			'refa', 'DBL',   // refraction constant A (radians)
			'refb', 'DBL',   // refraction constant B (radians)
		]);
	}

	function assertLDBODY(has, exp, eps, msg) {
		QUnit.assert.OBJECT(has, exp, eps, msg, [
			'bm', 'DBL',     // mass of the body (solar masses, Note 5)
			'dl', 'DBL',     // deflection limiter (Note 6)
			'eh', 'PV3',     // barycentric PV of the body (au, au/day)
		]);
	}

	var api = {
		DBL: assertDBL,
		INT: assertINT,
		V2: assertV2,
		V3: assertV3,
		PV3: assertPV3,
		DMSF: assertDMSF,
		MAT3: assertMAT3,
		MAT33: assertMAT33,
		OBJECT: assertOBJECT,
		ASTROM: assertASTROM,
		LDBODY: assertLDBODY,
	};

	QUnit.extend(QUnit.assert, api);

	return api;

}));
