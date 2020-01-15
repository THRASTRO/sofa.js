(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "sxp", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraSxp(tests[i][0], tests[i][1]);
				assert.V3(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (sp)');

			}
		});
	});

})(sxp_results);
