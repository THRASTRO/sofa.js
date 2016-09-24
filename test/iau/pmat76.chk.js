(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "pmat76", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauPmat76(tests[i][0], tests[i][1]);
				assert.MAT33(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rmatp)');

			}
		});
	});

})(pmat76_results);
