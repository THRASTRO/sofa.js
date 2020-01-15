(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "tttcg", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraTttcg(tests[i][0], tests[i][1]);
				assert.equal(res[0], tests[i][2], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (tcg1)');
				assert.close.percent(res[2], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (tcg2)');

			}
		});
	});

})(tttcg_results);
