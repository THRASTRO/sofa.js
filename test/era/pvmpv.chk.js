(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "pvmpv", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraPvmpv(tests[i][0], tests[i][1]);
				assert.PV3(res, tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (amb)');

			}
		});
	});

})(pvmpv_results);
