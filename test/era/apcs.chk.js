(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "apcs", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraApcs(tests[i][0], tests[i][1], tests[i][2], tests[i][3], tests[i][4]);
				assert.ASTROM(res, tests[i][5], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) + ' (astrom)');

			}
		});
	});

})(apcs_results);
