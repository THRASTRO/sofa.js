(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "nut06a", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauNut06a(tests[i][0], tests[i][1]);
				assert.close(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (dpsi)');
				assert.close(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (deps)');

			}
		});
	});

})(nut06a_results);
