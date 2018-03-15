(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "d2tf", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauD2tf(tests[i][0], tests[i][1]);
				assert.equal(res[0], tests[i][2], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (sign)');
				assert.DMSF(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (ihmsf)');

			}
		});
	});

})(d2tf_results);
