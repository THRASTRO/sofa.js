(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "pm", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauPm(tests[i][0]);
				assert.close(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' ([RV])');

			}
		});
	});

})(pm_results);
