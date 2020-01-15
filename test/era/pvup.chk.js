(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "pvup", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraPvup(tests[i][0], tests[i][1]);
				assert.V3(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (p)');

			}
		});
	});

})(pvup_results);
