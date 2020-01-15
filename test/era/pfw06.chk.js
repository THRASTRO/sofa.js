(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "pfw06", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraPfw06(tests[i][0], tests[i][1]);
				assert.close.percent(res[0], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (gamb)');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (phib)');
				assert.close.percent(res[2], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (psib)');
				assert.close.percent(res[3], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (epsa)');

			}
		});
	});

})(pfw06_results);
