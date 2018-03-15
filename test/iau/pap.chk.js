(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "pap", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauPap(tests[i][0], tests[i][1]);
				assert.close.percent(res, tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' ([RV])');

			}
		});
	});

})(pap_results);
