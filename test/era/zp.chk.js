(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "zp", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraZp();
				assert.V3(res, tests[i][0], 1e-8, 'void' + ' (p)');

			}
		});
	});

})(zp_results);
