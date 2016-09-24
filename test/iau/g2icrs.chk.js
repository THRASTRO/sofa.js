(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "g2icrs", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauG2icrs(tests[i][0], tests[i][1]);
				assert.close(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (dr)');
				assert.close(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (dd )');

			}
		});
	});

})(g2icrs_results);
