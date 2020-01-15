(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "ltecm", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraLtecm(tests[i][0]);
				assert.MAT33(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (rm)');

			}
		});
	});

})(ltecm_results);
