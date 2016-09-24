(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "zr", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauZr();
				assert.MAT33(res, tests[i][0], 1e-8, 'void' + ' (r)');

			}
		});
	});

})(zr_results);
