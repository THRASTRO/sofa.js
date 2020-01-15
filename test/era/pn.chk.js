(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "pn", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraPn(tests[i][0]);
				assert.close.percent(res[0], tests[i][1], 1e-6, JSON.stringify(tests[i][0]) + ' (r)');
				assert.V3(res[1], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) + ' (u)');

			}
		});
	});

})(pn_results);
