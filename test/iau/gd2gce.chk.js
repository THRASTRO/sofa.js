(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "gd2gce", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauGd2gce(tests[i][0], tests[i][1], tests[i][2], tests[i][3], tests[i][4]);
				assert.close(res[0], tests[i][5], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) + ' ([RV])');
				assert.V3(res[1], tests[i][6], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) + ' (xyz )');

			}
		});
	});

})(gd2gce_results);
