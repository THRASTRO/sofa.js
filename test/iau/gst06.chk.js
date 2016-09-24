(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "gst06", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauGst06(tests[i][0], tests[i][1], tests[i][2], tests[i][3], tests[i][4]);
				assert.close(res, tests[i][5], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) + ' ([RV])');

			}
		});
	});

})(gst06_results);
