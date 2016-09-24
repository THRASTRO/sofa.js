(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "apcg13", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauApcg13(tests[i][0], tests[i][1]);
				assert.ASTROM(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (astrom)');

			}
		});
	});

})(apcg13_results);
