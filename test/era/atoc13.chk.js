(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "atoc13", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraAtoc13(tests[i][0], tests[i][1], tests[i][2], tests[i][3], tests[i][4], tests[i][5], tests[i][6], tests[i][7], tests[i][8], tests[i][9], tests[i][10], tests[i][11], tests[i][12], tests[i][13], tests[i][14]);
				assert.equal(res[0], tests[i][15], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) +', '+ JSON.stringify(tests[i][5]) +', '+ JSON.stringify(tests[i][6]) +', '+ JSON.stringify(tests[i][7]) +', '+ JSON.stringify(tests[i][8]) +', '+ JSON.stringify(tests[i][9]) +', '+ JSON.stringify(tests[i][10]) +', '+ JSON.stringify(tests[i][11]) +', '+ JSON.stringify(tests[i][12]) +', '+ JSON.stringify(tests[i][13]) +', '+ JSON.stringify(tests[i][14]) + ' ([RV])');
				assert.close.percent(res[1], tests[i][16], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) +', '+ JSON.stringify(tests[i][5]) +', '+ JSON.stringify(tests[i][6]) +', '+ JSON.stringify(tests[i][7]) +', '+ JSON.stringify(tests[i][8]) +', '+ JSON.stringify(tests[i][9]) +', '+ JSON.stringify(tests[i][10]) +', '+ JSON.stringify(tests[i][11]) +', '+ JSON.stringify(tests[i][12]) +', '+ JSON.stringify(tests[i][13]) +', '+ JSON.stringify(tests[i][14]) + ' (rc)');
				assert.close.percent(res[2], tests[i][17], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) +', '+ JSON.stringify(tests[i][5]) +', '+ JSON.stringify(tests[i][6]) +', '+ JSON.stringify(tests[i][7]) +', '+ JSON.stringify(tests[i][8]) +', '+ JSON.stringify(tests[i][9]) +', '+ JSON.stringify(tests[i][10]) +', '+ JSON.stringify(tests[i][11]) +', '+ JSON.stringify(tests[i][12]) +', '+ JSON.stringify(tests[i][13]) +', '+ JSON.stringify(tests[i][14]) + ' (dc)');

			}
		});
	});

})(atoc13_results);
