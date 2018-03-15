(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "bpn2xy", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauBpn2xy(tests[i][0]);
				assert.close.percent(res[0], tests[i][1], 1e-6, JSON.stringify(tests[i][0]) + ' (x)');
				assert.close.percent(res[1], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) + ' (y)');

			}
		});
	});

})(bpn2xy_results);
