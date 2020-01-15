(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "tpors", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraTpors(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.equal(res[0], tests[i][4], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' ([RV])');
				assert.close.percent(res[1], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (a01)');
				assert.close.percent(res[2], tests[i][6], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (b01)');
				assert.close.percent(res[3], tests[i][7], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (a02)');
				assert.close.percent(res[4], tests[i][8], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (b02)');

			}
		});
	});

})(tpors_results);
