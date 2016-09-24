(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "icrs2g", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauIcrs2g(tests[i][0], tests[i][1]);
				assert.close(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (dl)');
				assert.close(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (db )');

			}
		});
	});

})(icrs2g_results);
