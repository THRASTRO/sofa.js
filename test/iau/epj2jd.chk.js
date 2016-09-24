(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "epj2jd", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauEpj2jd(tests[i][0]);
				assert.close(res[0], tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (djm0)');
				assert.close(res[1], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) + ' (djm)');

			}
		});
	});

})(epj2jd_results);
