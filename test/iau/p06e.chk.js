(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "p06e", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauP06e(tests[i][0], tests[i][1]);
				assert.close.percent(res[0], tests[i][2], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (eps0)');
				assert.close.percent(res[1], tests[i][3], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (psia)');
				assert.close.percent(res[2], tests[i][4], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (oma)');
				assert.close.percent(res[3], tests[i][5], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (bpa)');
				assert.close.percent(res[4], tests[i][6], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (bqa)');
				assert.close.percent(res[5], tests[i][7], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (pia)');
				assert.close.percent(res[6], tests[i][8], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (bpia)');
				assert.close.percent(res[7], tests[i][9], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (epsa)');
				assert.close.percent(res[8], tests[i][10], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (chia)');
				assert.close.percent(res[9], tests[i][11], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (za)');
				assert.close.percent(res[10], tests[i][12], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (zetaa)');
				assert.close.percent(res[11], tests[i][13], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (thetaa)');
				assert.close.percent(res[12], tests[i][14], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (pa)');
				assert.close.percent(res[13], tests[i][15], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (gam)');
				assert.close.percent(res[14], tests[i][16], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (phi)');
				assert.close.percent(res[15], tests[i][17], 1e-6, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (psi)');

			}
		});
	});

})(p06e_results);
