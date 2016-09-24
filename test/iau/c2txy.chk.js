(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "c2txy", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauC2txy(tests[i][0], tests[i][1], tests[i][2], tests[i][3], tests[i][4], tests[i][5], tests[i][6], tests[i][7]);
				assert.MAT33(res, tests[i][8], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) +', '+ JSON.stringify(tests[i][5]) +', '+ JSON.stringify(tests[i][6]) +', '+ JSON.stringify(tests[i][7]) + ' (rc2t)');

			}
		});
	});

})(c2txy_results);
