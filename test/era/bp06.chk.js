(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "bp06", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraBp06(tests[i][0], tests[i][1]);
				assert.MAT33(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rb)');
				assert.MAT33(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rp)');
				assert.MAT33(res[2], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rbp)');

			}
		});
	});

})(bp06_results);
