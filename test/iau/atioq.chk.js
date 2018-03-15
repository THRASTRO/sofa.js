(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "atioq", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauAtioq(tests[i][0], tests[i][1], tests[i][2]);
				assert.close.percent(res[0], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (aob)');
				assert.close.percent(res[1], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (zob)');
				assert.close.percent(res[2], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (hob)');
				assert.close.percent(res[3], tests[i][6], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (dob)');
				assert.close.percent(res[4], tests[i][7], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (rob)');

			}
		});
	});

})(atioq_results);
