(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "atci13", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauAtci13(tests[i][0], tests[i][1], tests[i][2], tests[i][3], tests[i][4], tests[i][5], tests[i][6], tests[i][7]);
				assert.close.percent(res[0], tests[i][8], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) +', '+ JSON.stringify(tests[i][5]) +', '+ JSON.stringify(tests[i][6]) +', '+ JSON.stringify(tests[i][7]) + ' (ri)');
				assert.close.percent(res[1], tests[i][9], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) +', '+ JSON.stringify(tests[i][5]) +', '+ JSON.stringify(tests[i][6]) +', '+ JSON.stringify(tests[i][7]) + ' (di)');
				assert.close.percent(res[2], tests[i][10], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) +', '+ JSON.stringify(tests[i][5]) +', '+ JSON.stringify(tests[i][6]) +', '+ JSON.stringify(tests[i][7]) + ' (eo)');

			}
		});
	});

})(atci13_results);
