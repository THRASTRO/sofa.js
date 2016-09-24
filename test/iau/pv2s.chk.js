(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "pv2s", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauPv2s(tests[i][0]);
				assert.close(res[0], tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (theta)');
				assert.close(res[1], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) + ' (phi)');
				assert.close(res[2], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) + ' (r)');
				assert.close(res[3], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) + ' (td)');
				assert.close(res[4], tests[i][5], 1e-8, JSON.stringify(tests[i][0]) + ' (pd)');
				assert.close(res[5], tests[i][6], 1e-8, JSON.stringify(tests[i][0]) + ' (rd)');

			}
		});
	});

})(pv2s_results);
