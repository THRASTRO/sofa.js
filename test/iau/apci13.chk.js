(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "apci13", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauApci13(tests[i][0], tests[i][1]);
				assert.ASTROM(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (astrom)');
				assert.close(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (eo)');

			}
		});
	});

})(apci13_results);
