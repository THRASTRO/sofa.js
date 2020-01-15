(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "ldn", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraLdn(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.V3(res, tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (sn)');

			}
		});
	});

})(ldn_results);
