(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "aper", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraAper(tests[i][0]);
				assert.ASTROM(res, tests[i][1], 1e-6, JSON.stringify(tests[i][0]) + ' (astrom)');

			}
		});
	});

})(aper_results);
