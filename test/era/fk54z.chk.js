(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "fk54z", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraFk54z(tests[i][0], tests[i][1], tests[i][2]);
				assert.close.percent(res[0], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (r1950)');
				assert.close.percent(res[1], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (d1950)');
				assert.close.percent(res[2], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (dr1950)');
				assert.close.percent(res[3], tests[i][6], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (dd1950)');

			}
		});
	});

})(fk54z_results);
