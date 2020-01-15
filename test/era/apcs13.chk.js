(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "apcs13", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraApcs13(tests[i][0], tests[i][1], tests[i][2]);
				assert.ASTROM(res, tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (astrom)');

			}
		});
	});

})(apcs13_results);
