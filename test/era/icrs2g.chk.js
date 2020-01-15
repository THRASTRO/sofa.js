(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "icrs2g", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraIcrs2g(tests[i][0], tests[i][1]);
				assert.close.percent(res[0], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (dl)');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (db )');

			}
		});
	});

})(icrs2g_results);
