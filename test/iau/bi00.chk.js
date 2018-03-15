(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "bi00", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauBi00();
				assert.close.percent(res[0], tests[i][0], 1e-6, 'void' + ' (dpsibi)');
				assert.close.percent(res[1], tests[i][1], 1e-6, 'void' + ' (depsbi)');
				assert.close.percent(res[2], tests[i][2], 1e-6, 'void' + ' (dra)');

			}
		});
	});

})(bi00_results);
