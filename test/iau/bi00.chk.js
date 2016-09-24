(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "bi00", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauBi00();
				assert.close(res[0], tests[i][0], 1e-8, 'void' + ' (dpsibi)');
				assert.close(res[1], tests[i][1], 1e-8, 'void' + ' (depsbi)');
				assert.close(res[2], tests[i][2], 1e-8, 'void' + ' (dra)');

			}
		});
	});

})(bi00_results);
