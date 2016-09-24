(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "ltpecl", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauLtpecl(tests[i][0]);
				assert.V3(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (vec)');

			}
		});
	});

})(ltpecl_results);
