(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "pmat00", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauPmat00(tests[i][0], tests[i][1]);
				assert.MAT33(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rbp)');

			}
		});
	});

})(pmat00_results);
