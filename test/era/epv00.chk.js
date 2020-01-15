(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "epv00", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraEpv00(tests[i][0], tests[i][1]);
				assert.equal(res[0], tests[i][2], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');
				assert.PV3(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (pvh)');
				assert.PV3(res[2], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (pvb)');

			}
		});
	});

})(epv00_results);
