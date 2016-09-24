(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "s2p", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauS2p(tests[i][0], tests[i][1], tests[i][2]);
				assert.V3(res, tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (p)');

			}
		});
	});

})(s2p_results);
