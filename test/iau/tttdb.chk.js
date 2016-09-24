(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "tttdb", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauTttdb(tests[i][0], tests[i][1], tests[i][2]);
				assert.close(res[0], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' ([RV])');
				assert.close(res[1], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (tdb1)');
				assert.close(res[2], tests[i][5], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (tdb2)');

			}
		});
	});

})(tttdb_results);
