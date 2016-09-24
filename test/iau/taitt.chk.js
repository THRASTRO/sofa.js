(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "taitt", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauTaitt(tests[i][0], tests[i][1]);
				assert.close(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');
				assert.close(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (tt1)');
				assert.close(res[2], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (tt2)');

			}
		});
	});

})(taitt_results);
