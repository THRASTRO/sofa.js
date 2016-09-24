(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "jd2cal", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauJd2cal(tests[i][0], tests[i][1]);
				assert.close(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');
				assert.close(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (iy)');
				assert.close(res[2], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (im)');
				assert.close(res[3], tests[i][5], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (id)');
				assert.close(res[4], tests[i][6], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (fd)');

			}
		});
	});

})(jd2cal_results);
