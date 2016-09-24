(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "c2tcio", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauC2tcio(tests[i][0], tests[i][1], tests[i][2]);
				assert.MAT33(res, tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (rc2t)');

			}
		});
	});

})(c2tcio_results);
