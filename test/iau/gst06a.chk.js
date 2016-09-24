(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "gst06a", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauGst06a(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.close(res, tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' ([RV])');

			}
		});
	});

})(gst06a_results);
