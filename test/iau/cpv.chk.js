(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "cpv", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauCpv(tests[i][0]);
				assert.PV3(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (c)');

			}
		});
	});

})(cpv_results);
