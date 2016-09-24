(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "ltpequ", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauLtpequ(tests[i][0]);
				assert.V3(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (veq)');

			}
		});
	});

})(ltpequ_results);
