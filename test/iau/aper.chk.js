(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "aper", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauAper(tests[i][0]);
				assert.ASTROM(res, tests[i][1], 1e-6, JSON.stringify(tests[i][0]) + ' (astrom)');

			}
		});
	});

})(aper_results);
