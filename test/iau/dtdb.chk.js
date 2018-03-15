(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "dtdb", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauDtdb(tests[i][0], tests[i][1], tests[i][2], tests[i][3], tests[i][4], tests[i][5]);
				assert.close.percent(res, tests[i][6], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) +', '+ JSON.stringify(tests[i][5]) + ' ([RV])');

			}
		});
	});

})(dtdb_results);
