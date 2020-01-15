(function (tests) {

	QUnit.module( "ERFA", function ()
	{
		QUnit.test( "zr", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = eraZr();
				assert.MAT33(res, tests[i][0], 1e-8, 'void' + ' (r)');

			}
		});
	});

})(zr_results);
