(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "moon98", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraMoon98(tests[i][0], tests[i][1]);
				assert.PV3(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (pv )');

			}
		});
	});

})(moon98_results);
