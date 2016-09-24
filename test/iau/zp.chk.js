(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "zp", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauZp();
				assert.V3(res, tests[i][0], 1e-8, 'void' + ' (p)');

			}
		});
	});

})(zp_results);
