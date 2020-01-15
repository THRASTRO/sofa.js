(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "fk5hz", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraFk5hz(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.close.percent(res[0], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (rh)');
				assert.close.percent(res[1], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (dh)');

			}
		});
	});

})(fk5hz_results);
