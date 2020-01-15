(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "pr00", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraPr00(tests[i][0], tests[i][1]);
				assert.close.percent(res[0], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (dpsipr)');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (depspr)');

			}
		});
	});

})(pr00_results);
