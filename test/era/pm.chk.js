(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "pm", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraPm(tests[i][0]);
				assert.close.percent(res, tests[i][1], 1e-6, JSON.stringify(tests[i][0]) + ' ([RV])');

			}
		});
	});

})(pm_results);
