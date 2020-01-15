(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "d2dtf", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraD2dtf(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.equal(res[0], tests[i][4], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' ([RV])');
				assert.equal(res[1], tests[i][5], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (iy)');
				assert.equal(res[2], tests[i][6], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (im)');
				assert.equal(res[3], tests[i][7], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (id)');
				assert.DMSF(res[4], tests[i][8], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (ihmsf)');

			}
		});
	});

})(d2dtf_results);
