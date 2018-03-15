(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "sp00", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauSp00(tests[i][0], tests[i][1]);
				assert.close.percent(res, tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');

			}
		});
	});

})(sp00_results);
