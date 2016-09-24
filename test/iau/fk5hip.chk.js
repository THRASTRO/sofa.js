(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "fk5hip", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauFk5hip(tests[i][0]);
				assert.V3(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (s5h)');

			}
		});
	});

})(fk5hip_results);
