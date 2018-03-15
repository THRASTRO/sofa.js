(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "pvstar", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauPvstar(tests[i][0]);
				assert.equal(res[0], tests[i][1], JSON.stringify(tests[i][0]) + ' ([RV])');
				assert.close.percent(res[1], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) + ' (ra)');
				assert.close.percent(res[2], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) + ' (dec)');
				assert.close.percent(res[3], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) + ' (pmr)');
				assert.close.percent(res[4], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) + ' (pmd)');
				assert.close.percent(res[5], tests[i][6], 1e-6, JSON.stringify(tests[i][0]) + ' (px)');
				assert.close.percent(res[6], tests[i][7], 1e-6, JSON.stringify(tests[i][0]) + ' (rv)');

			}
		});
	});

})(pvstar_results);
