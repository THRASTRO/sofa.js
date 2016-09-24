(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "anp", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauAnp(tests[i][0]);
				assert.close(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' ([RV])');

			}
		});
	});

})(anp_results);
