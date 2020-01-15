(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "tpstv", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraTpstv(tests[i][0], tests[i][1], tests[i][2]);
				assert.V3(res, tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (v)');

			}
		});
	});

})(tpstv_results);
