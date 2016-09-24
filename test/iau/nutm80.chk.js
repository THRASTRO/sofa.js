(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "nutm80", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauNutm80(tests[i][0], tests[i][1]);
				assert.MAT33(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (rmatn)');

			}
		});
	});

})(nutm80_results);
