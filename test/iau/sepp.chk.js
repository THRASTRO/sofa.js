(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "sepp", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauSepp(tests[i][0], tests[i][1]);
				assert.close(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');

			}
		});
	});

})(sepp_results);
