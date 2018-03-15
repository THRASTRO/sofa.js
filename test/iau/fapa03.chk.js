(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "fapa03", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauFapa03(tests[i][0]);
				assert.close.percent(res, tests[i][1], 1e-6, JSON.stringify(tests[i][0]) + ' ([RV])');

			}
		});
	});

})(fapa03_results);
