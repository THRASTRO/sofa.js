(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "atciqz", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauAtciqz(tests[i][0], tests[i][1], tests[i][2]);
				assert.close(res[0], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (ri)');
				assert.close(res[1], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (di)');

			}
		});
	});

})(atciqz_results);
