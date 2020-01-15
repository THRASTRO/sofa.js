(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "epj2jd", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraEpj2jd(tests[i][0]);
				assert.close.percent(res[0], tests[i][1], 1e-6, JSON.stringify(tests[i][0]) + ' (djm0)');
				assert.close.percent(res[1], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) + ' (djm)');

			}
		});
	});

})(epj2jd_results);
