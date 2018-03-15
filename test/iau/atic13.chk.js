(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "atic13", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauAtic13(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.close.percent(res[0], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (rc)');
				assert.close.percent(res[1], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (dc)');
				assert.close.percent(res[2], tests[i][6], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (eo)');

			}
		});
	});

})(atic13_results);
