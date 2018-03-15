(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "pb06", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauPb06(tests[i][0], tests[i][1]);
				assert.close.percent(res[0], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (bzeta)');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (bz)');
				assert.close.percent(res[2], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (btheta)');

			}
		});
	});

})(pb06_results);
