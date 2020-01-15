(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "a2af", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraA2af(tests[i][0], tests[i][1]);
				assert.equal(res[0], tests[i][2], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (sign)');
				assert.DMSF(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (idmsf)');

			}
		});
	});

})(a2af_results);
