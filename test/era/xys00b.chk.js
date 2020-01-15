(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "xys00b", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraXys00b(tests[i][0], tests[i][1]);
				assert.close.percent(res[0], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (x)');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (y)');
				assert.close.percent(res[2], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (s)');

			}
		});
	});

})(xys00b_results);
