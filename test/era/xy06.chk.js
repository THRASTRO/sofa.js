(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "xy06", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraXy06(tests[i][0], tests[i][1]);
				assert.close.percent(res[0], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (x)');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (y)');

			}
		});
	});

})(xy06_results);
