(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "eform", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauEform(tests[i][0]);
				assert.equal(res[0], tests[i][1], JSON.stringify(tests[i][0]) + ' ([RV])');
				assert.close.percent(res[1], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) + ' (a)');
				assert.close.percent(res[2], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) + ' (f )');

			}
		});
	});

})(eform_results);
