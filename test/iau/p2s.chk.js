(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "p2s", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauP2s(tests[i][0]);
				assert.close(res[0], tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (theta)');
				assert.close(res[1], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) + ' (phi)');
				assert.close(res[2], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) + ' (r)');

			}
		});
	});

})(p2s_results);
