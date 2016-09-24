(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "gmst00", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauGmst00(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.close(res, tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' ([RV])');

			}
		});
	});

})(gmst00_results);
