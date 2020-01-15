(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "ttut1", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraTtut1(tests[i][0], tests[i][1], tests[i][2]);
				assert.equal(res[0], tests[i][3], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' ([RV])');
				assert.close.percent(res[1], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (ut11)');
				assert.close.percent(res[2], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (ut12)');

			}
		});
	});

})(ttut1_results);
