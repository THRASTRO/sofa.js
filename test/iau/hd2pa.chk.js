(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "hd2pa", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauHd2pa(tests[i][0], tests[i][1], tests[i][2]);
				assert.close.percent(res, tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' ([RV])');

			}
		});
	});

})(hd2pa_results);
