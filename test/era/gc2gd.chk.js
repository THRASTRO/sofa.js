(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "gc2gd", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraGc2gd(tests[i][0], tests[i][1]);
				assert.equal(res[0], tests[i][2], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (elong)');
				assert.close.percent(res[2], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (phi)');
				assert.close.percent(res[3], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (height )');

			}
		});
	});

})(gc2gd_results);
