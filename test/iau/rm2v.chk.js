(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "rm2v", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauRm2v(tests[i][0]);
				assert.V3(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (w)');

			}
		});
	});

})(rm2v_results);
