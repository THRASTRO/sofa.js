(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "lteceq", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraLteceq(tests[i][0], tests[i][1], tests[i][2]);
				assert.close.percent(res[0], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (dr)');
				assert.close.percent(res[1], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (dd)');

			}
		});
	});

})(lteceq_results);
