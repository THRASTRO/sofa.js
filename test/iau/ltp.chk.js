(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "ltp", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauLtp(tests[i][0]);
				assert.MAT33(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (rp)');

			}
		});
	});

})(ltp_results);
