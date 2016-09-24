(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "ir", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauIr();
				assert.MAT33(res, tests[i][0], 1e-8, 'void' + ' (r)');

			}
		});
	});

})(ir_results);
