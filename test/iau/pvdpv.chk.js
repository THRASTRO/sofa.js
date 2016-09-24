(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "pvdpv", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauPvdpv(tests[i][0], tests[i][1]);
				assert.V2(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (adb)');

			}
		});
	});

})(pvdpv_results);
