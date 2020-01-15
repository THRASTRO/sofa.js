(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "c2i00b", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraC2i00b(tests[i][0], tests[i][1]);
				assert.MAT33(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rc2i)');

			}
		});
	});

})(c2i00b_results);
