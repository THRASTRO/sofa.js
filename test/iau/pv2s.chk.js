(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "pv2s", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauPv2s(tests[i][0]);
				assert.close.percent(res[0], tests[i][1], 1e-6, JSON.stringify(tests[i][0]) + ' (theta)');
				assert.close.percent(res[1], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) + ' (phi)');
				assert.close.percent(res[2], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) + ' (r)');
				assert.close.percent(res[3], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) + ' (td)');
				assert.close.percent(res[4], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) + ' (pd)');
				assert.close.percent(res[5], tests[i][6], 1e-6, JSON.stringify(tests[i][0]) + ' (rd)');

			}
		});
	});

})(pv2s_results);
