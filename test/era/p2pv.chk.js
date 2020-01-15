(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "p2pv", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraP2pv(tests[i][0]);
				assert.PV3(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (pv)');

			}
		});
	});

})(p2pv_results);
