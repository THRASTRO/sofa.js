(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "zpv", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraZpv();
				assert.PV3(res, tests[i][0], 1e-8, 'void' + ' (pv)');

			}
		});
	});

})(zpv_results);
