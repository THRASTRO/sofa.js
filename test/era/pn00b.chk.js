(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "pn00b", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraPn00b(tests[i][0], tests[i][1]);
				assert.close.percent(res[0], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (dpsi)');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (deps)');
				assert.close.percent(res[2], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (epsa)');
				assert.MAT33(res[3], tests[i][5], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rb)');
				assert.MAT33(res[4], tests[i][6], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rp)');
				assert.MAT33(res[5], tests[i][7], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rbp)');
				assert.MAT33(res[6], tests[i][8], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rn)');
				assert.MAT33(res[7], tests[i][9], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rbpn)');

			}
		});
	});

})(pn00b_results);
