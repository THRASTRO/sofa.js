(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "ee00b", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraEe00b(tests[i][0], tests[i][1]);
				assert.close.percent(res, tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');

			}
		});
	});

})(ee00b_results);
