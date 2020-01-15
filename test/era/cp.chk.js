(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "cp", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraCp(tests[i][0]);
				assert.V3(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (c)');

			}
		});
	});

})(cp_results);
