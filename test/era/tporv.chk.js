(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "tporv", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraTporv(tests[i][0], tests[i][1], tests[i][2]);
				assert.equal(res[0], tests[i][3], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' ([RV])');
				assert.V3(res[1], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (v01)');
				assert.V3(res[2], tests[i][5], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (v02)');

			}
		});
	});

})(tporv_results);
