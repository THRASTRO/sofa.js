(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "gst00a", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauGst00a(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.close.percent(res, tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' ([RV])');

			}
		});
	});

})(gst00a_results);
