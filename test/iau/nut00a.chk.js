(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "nut00a", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauNut00a(tests[i][0], tests[i][1]);
				assert.close.percent(res[0], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (dpsi)');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (deps)');

			}
		});
	});

})(nut00a_results);
