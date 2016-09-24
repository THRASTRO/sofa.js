(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "hfk5z", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauHfk5z(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.close(res[0], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (r5)');
				assert.close(res[1], tests[i][5], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (d5)');
				assert.close(res[2], tests[i][6], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (dr5)');
				assert.close(res[3], tests[i][7], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (dd5)');

			}
		});
	});

})(hfk5z_results);
