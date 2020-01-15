(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "plan94", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraPlan94(tests[i][0], tests[i][1], tests[i][2]);
				assert.equal(res[0], tests[i][3], JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' ([RV])');
				assert.PV3(res[1], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) + ' (pv)');

			}
		});
	});

})(plan94_results);
