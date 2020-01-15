(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "s2xpv", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraS2xpv(tests[i][0], tests[i][1], tests[i][2]);
				assert.PV3(res, tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (spv)');

			}
		});
	});

})(s2xpv_results);
