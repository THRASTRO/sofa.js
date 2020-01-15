(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "pv2p", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraPv2p(tests[i][0]);
				assert.V3(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (p)');

			}
		});
	});

})(pv2p_results);
