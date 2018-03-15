(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "jd2cal", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauJd2cal(tests[i][0], tests[i][1]);
				assert.equal(res[0], tests[i][2], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');
				assert.equal(res[1], tests[i][3], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (iy)');
				assert.equal(res[2], tests[i][4], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (im)');
				assert.equal(res[3], tests[i][5], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (id)');
				assert.close.percent(res[4], tests[i][6], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (fd)');

			}
		});
	});

})(jd2cal_results);
