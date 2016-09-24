(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "gst94", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauGst94(tests[i][0], tests[i][1]);
				assert.close(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');

			}
		});
	});

})(gst94_results);
