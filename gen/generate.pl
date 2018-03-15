#!/usr/bin/perl
use strict;
use warnings;
################################################################################
# IAU SOFA C functions to JS converter
# http:://www.github.com/mgreter/sofa.js
# (c) 2016-2018 by Marcel Greter
################################################################################
# Software provided as is without any warranty!
################################################################################
# Poorly hacked together over two weekends. C source files are
# Copyright (C) Standards Of Fundamental Astronomy Review Board
# of the International Astronomical Union. Please read their license!
################################################################################
# - Converts iau C functions to JS functions
# - Generates QUnit tests for all functions
# - Creates C programs to gather test data
# - Extracts documentation for functions
################################################################################

my $root = '..';

################################################################################
# str: scale = "TAI" or "UTC"
# str: tcoord = "R", "H" or "A"
# char: sign = '+' or '-'
################################################################################
my %vtypes = (
	'int' => {
		'basic' => 1,
		'assert' => 'equal',
		'init' => '0',
		'decl' => "int %s",
		'c2json' => "printf(\"%%d\", %s)",
		'fmat' => "%d",
		'var' => "t%d",
		'pass' => "&%s",
		'res' => "res%d",
		'arg' => "%s"
	},
	'double' => {
		'basic' => 1,
		'assert' => 'close.percent',
		'epsilon' => '1e-6',
		'init' => '0.0',
		'decl' => "double %s",
		'c2json' => "printf(\"%%.28e\", %s)",
		'fmat' => "%.28e",
		'var' => "t%d",
		'pass' => "&%s",
		'res' => "res%d",
		'arg' => "%s"
	},
	'charp' => {
		'basic' => 1,
		'assert' => 'equal',
		'init' => "0",
		'decl' => "const char* %s",
		'c2json' => "printf(\"'%%s'\", %s)",
		'fmat' => "'%s'",
		'var' => "t%d",
		'pass' => "&%s",
		'res' => "res%d",
		'arg' => "%s"
	},
	'char' => {
		'basic' => 1,
		'assert' => 'equal',
		'init' => "0",
		'decl' => "char %s",
		'c2json' => "printf(\"'%%c'\", %s)",
		'fmat' => "'%c'",
		'var' => "t%d",
		'pass' => "&%s",
		'res' => "res%d",
		'arg' => "%s"
	},
	'string' => {
		'basic' => 1,
		'assert' => 'equal',
		'init' => "''",
		'decl' => "const char* %s",
		'c2json' => "%s",
		'c2json' => "printf(\"'%%s'\", %s)",
		'var' => "t%d",
		'pass' => "%s",
		'res' => "res%d",
		'arg' => "%s"
	},
	'v2' => {
		'assert' => 'V2',
		'epsilon' => '1e-8',
		'init' => "[0, 0]",
		'decl' => "double %s[2]",
		'c2json' => "exportV2(%s)",
		'fmat' => "'%s'",
		'var' => "t%d",
		'pass' => "%s",
		'res' => "res%d",
		'arg' => "%s"
	},
	'v3' => {
		'assert' => 'V3',
		'epsilon' => '1e-8',
		'init' => "[0, 0, 0]",
		'decl' => "double %s[3]",
		'c2json' => "exportV3(%s)",
		'fmat' => "'%s'",
		'var' => "t%d",
		'pass' => "%s",
		'res' => "res%d",
		'arg' => "%s"
	},
	'pv3' => {
		'assert' => 'PV3',
		'epsilon' => '1e-8',
		'init' => "[ [0,0,0], [0,0,0] ]",
		'decl' => "double %s[2][3]",
		'c2json' => "exportPV3(%s)",
		'fmat' => "'%s'",
		'var' => "t%d",
		'pass' => "%s",
		'res' => "res%d",
		'arg' => "%s"
	},
	'dmsf' => {
		'assert' => 'DMSF',
		'epsilon' => '1e-8',
		'init' => '[0,0,0,0]',
		'decl' => "int %s[4]",
		'c2json' => "exportDMSF(%s)",
		'fmat' => "'%s'",
		'var' => "t%d",
		'pass' => "%s",
		'res' => "res%d",
		'arg' => "%s"
	},
	'mat33' => {
		'assert' => 'MAT33',
		'epsilon' => '1e-8',
		'init' => "[ [0,0,0], [0,0,0], [0,0,0] ]",
		'decl' => "double %s[3][3]",
		'c2json' => "exportMAT33(%s)",
		'fmat' => "'%s'",
		'var' => "t%d",
		'pass' => "%s",
		'res' => "res%d",
		'arg' => "%s"
	},
	'iauLDBODY' => {
		'assert' => 'LDBODY',
		'epsilon' => '1e-8',
		'init' => '{bm:0,dl:0,pv:[]}',
		# 'decl' => "iauLDBODY %s[100]",
		'c2json' => "exportLDBODY(_%1\$s, %1\$s)",
		'fmat' => "'%s'",
		'var' => "t%d",
		'pass' => "&%s",
		'res' => "res%d",
		'arg' => "&%s"
	},
	'iauASTROM' => {
		'assert' => 'ASTROM',
		'epsilon' => '1e-6',
		'init' => '{pmt:0,eb:iauZp(),eh:iauZp(),em:0,v:iauZp(),bm1:0,bpn:iauZr(),along:0,xpl:0,ypl:0,sphi:0,cphi:0,diurab:0,eral:0,refa:0,refb:0}',
		'decl' => "iauASTROM %s",
		'c2json' => "exportASTROM(%s)",
		'fmat' => "'%s'",
		'var' => "t%d",
		'pass' => "&%s",
		'res' => "res%d",
		'arg' => "&%s"
	},
);

################################################################################
# map input types to vtypes
# loop for input variables
################################################################################

my %itypes = (
	'ndp' => {
		'vtype' => 'int',
		'beg' => '-7',
		'end' => '5',
		'd' => '3',
	},
	'angle' => {
		'vtype' => 'double',
		'beg' => '- 195',
		'end' => '+ 195',
		'd' => '180 / 24.0',
	},
	'p3' => {
		'vtype' => 'v3',
		'beg' => '- 1.73333 * 10.0',
		'end' => '+ 1.73333 * 10.0',
		'd' => '1.73333',
		'multi' => 3,
	},
	'v3' => {
		'vtype' => 'v3',
		'beg' => - .00257777 * 16.0,
		'end' => + .00257777 * 16.0,
		'd' => .00257777 * 12,
		'multi' => 3,
	},
	'double' => {
		'vtype' => 'double',
		'beg' => - 0.75 * 16,
		'end' => + 0.75 * 16,
		'd' => 0.75 * 5,
	},
	'sdouble' => {
		'vtype' => 'double',
		'beg' => - 1.75 * 16,
		'end' => + 1.75 * 16,
		'd' => 1.75 * 12,
	},
	'vsdouble' => {
		'vtype' => 'double',
		'beg' => 0.0 - 1.75 * 16,
		'end' => 0.0 + 1.75 * 16,
		'd' => 1.75 * 16,
	},
	'stime' => {
		'vtype' => 'double',
		'beg' => 2451545.0 - 7750.0 * 64.0,
		'end' => 2451545.0 + 7750.0 * 64.0,
		'd' => 7750.0 * 16,
	},
	'sstime' => {
		'vtype' => 'double',
		'beg' => 2451545.0 - 7750.0 * 64.0,
		'end' => 2451545.0 + 7750.0 * 64.0,
		'd' => 7750.0 * 64,
	},
	'time' => {
		'vtype' => 'double',
		'beg' => '2451545.0 - 7750.0 * 100.0',
		'end' => '2451545.0 + 7750.0 * 100.0',
		'd' => '7750.0',
	},
	'char' => {
		'vtype' => 'char',
		'beg' => '\'A\'',
		'end' => '\'C\'',
		'd' => '1',
	},
	'days' => {
		'vtype' => 'double',
		'beg' => '0.0 - 36.0 * 5.0',
		'end' => '0.0 + 36.0 * 5.0',
		'd' => '36.0',
	},
	'v2' => {
		'vtype' => 'v2',
		'beg' => '- 1.73333 * 0.0 - 1',
		'end' => '+ 1.73333 * 1.0 - 1',
		'd' => '1.73333',
		'multi' => 2,
	},
	'pv3' => {
		'vtype' => 'pv3',
		'beg' => '- 1.73333 * 0.0 - 1',
		'end' => '+ 1.73333 * 1.0 - 1',
		'd' => '1.73333',
		'multi' => 3,
	},
	'dmsf' => {
		'vtype' => 'dmsf',
		'beg' => '-2',
		'end' => '33',
		'd' => '14',
		'multi' => 4,
	},
	'mat33' => {
		'vtype' => 'mat33',
	},
	'iauLDBODY' => {
		'vtype' => 'iauLDBODY',
		'beg' => '0',
		'end' => '1',
		'd' => '1',
	},
	'iauASTROM' => {
		'vtype' => 'iauASTROM',
		'beg' => '0',
		'end' => '3',
		'd' => '1',
	},
	'tscale' => {
		'vtype' => 'string',
		'beg' => '0',
		'end' => '1',
		'd' => '1',
	},
	'ell' => {
		'vtype' => 'int',
		'beg' => '1',
		'end' => '3',
		'd' => '1',
	},
	'int' => {
		'vtype' => 'int',
		'beg' => - 96,
		'end' => + 96,
		'd' => 32,
	},
	'ldblen' => {
		'vtype' => 'int',
		'beg' => 0,
		'end' => 2,
		'd' => 1,
	},
	'tcoord' => {
		'vtype' => 'charp',
		'beg' => '0',
		'end' => '2',
		'd' => '1',
	},

	'ut11' => {
		'vtype' => 'double',
		'beg' => - 666 * 2,
		'end' => + 666 * 2,
		'd' => 666,
	},
	'ut12' => {
		'vtype' => 'double',
		'beg' => - 3,
		'end' => + 3,
		'd' => 0.75,
	},
	'dt' => {
		'vtype' => 'double',
		'beg' => '-1',
		'end' => '1',
		'd' => '0.25',
	},
	'sign' => {
		'vtype' => 'char',
		'beg' => '\'+\'',
		'end' => '\'-\'',
		'd' => '\'-\' - \'+\'',
	},
	'dist' => {
		'vtype' => 'double',
		'beg' => '0.5',
		'end' => '10.5',
		'd' => '2.5',
	},
	'bangle' => {
		'vtype' => 'double',
		'beg' => '- 10000',
		'end' => '+ 10000',
		'd' => '10000 / 32.0',
	},
	'sangle' => {
		'vtype' => 'double',
		'beg' => '- 180',
		'end' => '+ 180',
		'd' => '180 / 3.0',
	}
);

################################################################################
# regex are either copied or hacked together
# could be more modular and names are arbitrary
################################################################################

# match text in apos or quotes
#**************************************************************************************************
our $re_apo = qr/(?:[^\'\\]+|\\.)*/s;
our $re_quot = qr/(?:[^\"\\]+|\\.)*/s;

# match an identifier or name
#**************************************************************************************************
our $re_identifier = qr/(?!double|int)\b[_a-zA-Z][_a-zA-Z0-9\-]*/s;

# match a text (can be identifier or quoted string)
#**************************************************************************************************
our $re_string = qr/(?:$re_identifier|\"$re_quot\"|\'$re_apo\')/is;

# some regex magic (gets the job done ...)
#**************************************************************************************************
our ($re_arg, $re_op, $re_ops);
our $rc = qr/\s*(?:\/\*.*?\*\/|~COMMENT~\d+~)?\s*/;
our $re_arr_size = qr/(?:\d+|$re_identifier\s*\+\s*\d+)/;
our $re_s_var = qr/$re_identifier(?:\[[^\]]*\])*/;
our $re_vname = qr/$re_identifier(?:\.$re_identifier)*/;
our $re_nr = qr/(?:[+-]?\s*)(?:\d*\.\d+|\d+L?)(?:e[+-]?\d+)?/;
our $re_var = qr/(?:[+\-]\s*)?[\&\*]?$re_vname(?:->$re_vname)?(?:\[(??{$re_op})\])*/;
our $re_vars = qr/(?:$re_var|$re_nr|\'$re_apo\'|\"$re_quot\"|$re_vname\(\s*(??{$re_arg})\s*\))/;
our $re_scl = qr/(?:$re_vars|[+-]?\(\s*(??{$re_ops})\s*\))/; # |(??{$re_op_ls})
$re_op = qr/$re_scl(?:\s*[+\-*\/\<\>]\s*$re_scl)*/;
$re_ops = qr/(?:$re_op|[+-]?\(\s*(??{$re_ops})\s*\))/;
$re_ops = qr/(?:$re_ops|\(\s*$re_ops\s*\))/;
$re_arg = qr/$re_ops(?:\s*,\s*$re_ops)*/;
$re_ops = qr/(?:$re_ops|$re_ops\s*\?\s*$re_ops\s*:\s*$re_ops\s*)/;
our $re_va = qr/(?:$re_identifier(?:\s*=\s*$re_nr)?)/;
our $re_itm = qr/(?:$re_nr|$re_identifier)/s;
our $re_itm_list = qr/$re_itm(?:\s*,\s*$re_itm)*/s;
our $re_entry = qr/$rc(?:$re_itm|\{$rc(?:$re_itm_list)$rc\})$rc/s;
our $re_entries = qr/$re_entry(?:\s*,\s*$re_entry)+/s;
our $re_array_def = qr/\{\s*(?:$re_entries)*\s*\}/s;

# a bunch of regex magic to parse the enums/arrays
our $re_sizeof_nm = qr/\s*(?:sizeof\s*(?:\([A-Za-z]+\)|$re_identifier)(?:\[$re_arr_size\])*|$re_nr)\s*/;
our $re_sizeof = qr/\s*(?:sizeof\s*(\([A-Za-z]+\)|$re_identifier)(?:\[$re_arr_size\])*|$re_nr)\s*/;
our $re_sizeof_nm_divs = qr/$re_sizeof_nm(?:\/$re_sizeof_nm)*/;
our $re_sizeof_divs = qr/$re_sizeof(?:\/$re_sizeof)*/;
our $re_z_st = qr/\(int\)\($re_sizeof_nm_divs\)/s;
our $re_z_sts = qr/$re_z_st(?:\s*,\s*$re_z_st)*/s;
our $re_sz_st = qr/\{\s*$re_z_sts\s*\}/s;
our $re_sz_sts = qr/$re_sz_st(?:\s*,\s*$re_sz_st)*/s;
our $re_st = qr/$re_identifier\[$re_arr_size\]\s*=\s*$re_sz_sts/s;
our $re_sts = qr/$re_st(?:\s*,\s*$re_st)*/s;

################################################################################
################################################################################

my $rvlfh = open(my $lfh, "<", "$root/LICENSE.txt");
die "could not open '$root/LICENSE.txt'\n" unless $rvlfh;
my $license = join("", <$lfh>); close($lfh);

################################################################################
################################################################################

sub parse_array {
	my ($m, $structs) = @_;
	my $r = "                ";
	while ($m =~ s/^\s*\*?($re_identifier)(?:\[(?:$re_identifier\s*\+\s*\d+|$re_identifier|\d*)\])+\s*=\s*($re_array_def)(\s*[,;]?\s*)//s) {
		my ($var, $body, $el) = ($1, $2, $3);
		$body =~ s/\{/\[/g;
		$body =~ s/\}/\]/g;
		$r .= "$var = $body$el";
	}
	return "var " . $r;
}

sub parse_struct {
	my ($struct, $var, $body, $structs) = @_;
	my $i = 0;
	$body =~ s/\{/\[/g;
	$body =~ s/\}/\]/g;
	$struct =~ s/(?:\/\*.*?\*\/|~COMMENT~\d+~)//g;
	while($struct =~ s/var ($rc$re_identifier(?:$rc,$rc$re_identifier)*)//) {
		foreach my $v (split /\s*,\s*/, $1) {
			unless (exists $structs->{$v}) {
				$structs->{$v} = {};
			}
			if (exists $structs->{$v}->{$var}) {
				if ($structs->{$v}->{$var} != $i) {
					die "struct error $v";
				}
			}
			$structs->{$v}->{$var} = $i ++;
		}
	}
	return "$var = $body";
}

# only needed in epv00
sub parse_size_array {
	my ($m) = @_;
	my $r = '             ';
	while($m =~ s/^\s*($re_identifier)\[$re_arr_size\]\s*=\s*($re_sz_sts)(\s*[,;]?\s*)//) {
		my ($var, $body, $el) = ($1, $2, $3);
		$body =~ s/\(int\)\($re_sizeof_divs\)/$1.length \/ 3/g;
		$body =~ s/\{/\[/g;
		$body =~ s/\}/\]/g;
		$r .= "$var    = $body$el";
	}
	return "var " . $r;
}

################################################################################
################################################################################

sub convert_ptr_var {
	my ($v) = @_;
	$v =~ s/^\*//;
	return $v;
}

sub convert_int_decl {
	my @ints = split /\s*,\s*/, $_[0];
	foreach my $long (@ints) {
		next if ($long =~ m/\[/);
		$_[1]->{$long} = 1;
	}
	return "var " . $_[0];
}

sub convert_float_decl {
	my @floats = split /\s*,\s*/, $_[0];
	foreach my $float (@floats) {
		next if ($float =~ m/\[/);
		$_[1]->{$float} = 1;
	}
	return "var " . $_[0];
}

sub convert_int_asgn {
	my ($a, $b, $c) = @_;
	if ($c =~ m/^[-+]?\d+$/) {
		return "$a $b $c";
	}
	return "$a $b ~~($c)";
}

################################################################################
################################################################################

sub fmat {
	my $itype = $itypes{$_[0]}->{'vtype'};
	my $vtype = $vtypes{$itype};
	return $vtype->{'fmat'};
}

################################################################################
################################################################################

sub initVar { # var_name, var_vtype
	die $_[1] unless exists $itypes{$_[1]};
	my $itype = $itypes{$_[1]}->{'vtype'};
	die $_[1] unless exists $vtypes{$itype}->{'init'};
	return $_[0] . " = " . $vtypes{$itype}->{'init'} . ";";

}

sub mt {
	my @arr;
	for (my $i = 0; $i < $_[1]; $i++) {
		push @arr, $_[0];
	}
	return @arr;
}

my %config = (
	a2af => { arg => ['ndp', 'angle'], out => ['sign', 'dmsf'] },
	a2tf => { arg => ['ndp', 'angle'], out => ['sign', 'dmsf'] },
	ab => { arg => ['p3','v3','double','double'], out => ['v3'], mod => 15 },
	af2a => { arg => ['sign','int','int','double'], out => ['double'], rv => 'int' },
	anp => { arg => ['bangle'], rv => 'double' },
	anpm => { arg => ['angle'], rv => 'double' },
	apcg => { arg => [mt('stime', 2), 'pv3', 'v3'], out => ['astrom'], mod => 10 },
	apcg13 => { arg => [mt('stime', 2)], out => ['astrom'], mod => 5 },
	apci => { arg => [mt('stime', 2), 'pv3', 'v3', mt('sdouble', 3)], out => ['astrom'] },
	apci13 => { arg => [mt('stime', 2)], out => ['astrom', 'double'] },
	apco => { arg => [mt('sstime', 2), 'pv3', 'v3', mt('sdouble', 12)], out => ['astrom'] },
	apco13 => { arg => [mt('vsdouble', 12)], out => ['astrom', 'double'], rv => 'int' },
	apcs => { arg => [mt('stime', 2), 'pv3', 'pv3', 'v3'], out => ['astrom'], reuse => 1, mod => 5 },
	apcs13 => { arg => [mt('sstime', 2), 'pv3'], out => ['astrom'], mod => 10 },
	aper => { arg => [mt('double', 1)], out => ['astrom'], reuse => 1 },
	aper13 => { arg => [mt('double', 2)], out => ['astrom'] },
	apio => { arg => [mt('sdouble',9)], out => ['astrom'] },
	apio13 => { arg => [mt('sdouble',4),mt('vsdouble',8)], out => ['astrom'], rv => 'int' },
	atci13 => { arg => [mt('sdouble', 6),mt('stime',2)], out => [mt('double', 3)] },
	atciq => { arg => [mt('sdouble', 6),'astrom'], out => [mt('double', 2)] },
	atciqn => { arg => [mt('sdouble',6),'astrom','ldblen','lbody'], out => [mt('double',2)] },
	atciqz => { arg => [mt('double',2),'astrom'], out => [mt('double', 2)] },
	atco13 => { arg => [mt('sdouble', 8),mt('vsdouble', 10)], out => [mt('double',6)], rv => 'int' },
	atic13 => { arg => [mt('sdouble', 2),mt('stime',2)], out => [mt('double',3)] },
	aticq => { arg => [mt('double',2),'astrom'], out => [mt('double', 2)] },
	aticqn => { arg => [mt('vsdouble',2),'astrom','ldblen','lbody'], out => [mt('double', 2)] },
	atio13 => { arg => [mt('vsdouble',14)], out => [mt('double', 5)], rv => 'int' },
	atioq => { arg => ['double','double','astrom'], out => [mt('double', 5)] },
	atoc13 => { arg => ['tcoord', mt('vsdouble',14)], out => [mt('double', 2)], rv => 'int' },
	atoi13 => { arg => ['tcoord', mt('vsdouble',14)], out => [mt('double', 2)], rv => 'int' },
	atoiq => { arg => ['tcoord', mt('sdouble',2), 'astrom'], out => [mt('double', 2)] },
	bi00 => { out => [mt('double', 3)] },
	bp00 => { arg => [mt('stime', 2)], out => [mt('mat33', 3)] },
	bp06 => { arg => [mt('stime', 2)], out => [mt('mat33', 3)] },
	bpn2xy => { arg => ['mat33'], out => [mt('double', 2)] },
	c2i00a => { arg => ['stime','stime'], out => ['mat33'] },
	c2i00b => { arg => ['stime','stime'], out => ['mat33'] },
	c2i06a => { arg => ['stime','stime'], out => ['mat33'] },
	c2ibpn => { arg => ['stime','stime','mat33'], out => ['mat33'] },
	c2ixy => { arg => ['stime','stime','double','double'], out => ['mat33'], mod => 50 },
	c2ixys => { arg => ['double','sdouble','sdouble'], out => ['mat33'] },
	c2s => { arg => ['v3'], out => ['double','double'] },
	c2t00a => { arg => [mt('sdouble',6)], out => ['mat33'] },
	c2t00b => { arg => [mt('sdouble',6)], out => ['mat33'] },
	c2t06a => { arg => [mt('sdouble',6)], out => ['mat33'] },
	c2tcio => { arg => ['mat33','double','mat33'], out => ['mat33'] },
	c2teqx => { arg => ['mat33','double','mat33'], out => ['mat33'] },
	c2tpe => { arg => [mt('sdouble',8)], out => ['mat33'] },
	c2txy => { arg => [mt('sdouble',8)], out => ['mat33'] },
	cal2jd => { arg => [mt('days', 3)], out => [mt('double', 2)], rv => 'int', mod => 3 },
	cp => { arg => ['v3'], out => ['v3'] },
	cpv => { arg => ['pv3'], out => ['pv3'] },
	cr => { arg => ['mat33'], out => ['mat33'] },
	d2dtf => { arg => ['tscale', 'ndp', 'double', 'double'], out => [mt('int',3),'dmsf'], rv => 'int' },
	d2tf => { arg => ['ndp','days'], output => 'dmsf', out => ['sign', 'dmsf'] },
	dat => { arg => [mt('days', 3),'double'], out => ['double'], rv => 'int', mod => 3 },
	dtdb => { arg => [mt('double',6)], rv => 'double', mod => 15 },
	dtf2d => { arg => ['tscale', mt('days',3), mt('int',2), 'double'], out => [mt('double',2)], rv => 'int' },
	ee00 => { arg => ['stime','stime','double','double'], rv => 'double' },
	ee00a => { arg => ['stime','stime'], rv => 'double' },
	ee00b => { arg => ['stime','stime'], rv => 'double' },
	ee06a => { arg => ['stime','stime'], rv => 'double' },
	eect00 => { arg => ['stime','stime'], rv => 'double' },
	eform => { arg => ['ndp'], out => ['double','double'], rv => 'int' },
	eo06a => { arg => ['stime','stime'], rv => 'double' },
	eors => { arg => ['mat33','double'], rv => 'double' },
	epb => { arg => ['days','days'], rv => 'double' },
	epb2jd => { arg => ['stime'], out => ['double','double'] },
	epj => { arg => ['days','days'], rv => 'double' },
	epj2jd => { arg => ['stime'], out => ['double','double'] },
	epv00 => { arg => ['stime','stime'], out => ['pv3','pv3'], rv => 'int' },
	eqeq94 => { arg => ['stime','stime'], rv => 'double' },
	era00 => { arg => ['stime','stime'], rv => 'double' },
	fad03 => { arg => ['time'], rv => 'double' },
	fae03 => { arg => ['time'], rv => 'double' },
	faf03 => { arg => ['time'], rv => 'double' },
	faju03 => { arg => ['time'], rv => 'double' },
	fal03 => { arg => ['time'], rv => 'double' },
	falp03 => { arg => ['time'], rv => 'double' },
	fama03 => { arg => ['time'], rv => 'double' },
	fame03 => { arg => ['time'], rv => 'double' },
	fane03 => { arg => ['time'], rv => 'double' },
	faom03 => { arg => ['time'], rv => 'double' },
	fapa03 => { arg => ['time'], rv => 'double' },
	fasa03 => { arg => ['time'], rv => 'double' },
	faur03 => { arg => ['time'], rv => 'double' },
	fave03 => { arg => ['time'], rv => 'double' },
	fk5hip => { arg => [mt('mat33', 1)], out => [mt('v3', 1)], mod => 1 },
	fk5hz => { arg => [mt('sdouble', 4)], out => [mt('double', 2)] },
	fk52h => { arg => [mt('sdouble', 6)], out => [mt('double', 6)] },
	fw2m => { arg => [mt('sdouble', 4)], out => [mt('mat33',1)] },
	fw2xy => { arg => [mt('sdouble', 4)], out => [mt('double',2)] },
	gc2gd => { arg => ['ell','v3'], out => [mt('double',3)], rv => 'int' },
	gc2gde => { arg => ['double','sdouble','v3'], out => [mt('double',3)], rv => 'int', mod => 10 },
	gd2gc => { arg => ['ell',mt('double',3)], out => ['v3'], rv => 'int' },
	gd2gce => { arg => ['double','double',mt('double',3)], out => ['v3'], rv => 'int', mod => 5 },
	gmst00 => { arg => [mt('double', 4)], rv => 'double' },
	gmst06 => { arg => [mt('double', 4)], rv => 'double' },
	gmst82 => { arg => [mt('double', 2)], rv => 'double' },
	gst00a => { arg => [mt('double', 4)], rv => 'double' },
	gst00b => { arg => [mt('double', 2)], rv => 'double' },
	gst06 => { arg => [mt('double', 4),'mat33'], rv => 'double' },
	gst06a => { arg => [mt('double', 4)], rv => 'double' },
	gst94 => { arg => [mt('double', 2)], rv => 'double' },
	h2fk5 => { arg => [mt('sdouble', 6)], out => [mt('double', 6)] },
	hfk5z => { arg => [mt('double', 4)], out => [mt('double', 4)] },
	ir => { out => ['mat33'] },
	jd2cal => { arg => ['stime','days'], rv => 'int', out => ['int', 'int', 'int', 'double'] },
	jdcalf => { arg => ['ndp', mt('double',2)], out => ['dmsf'], rv => 'int' },
	ld => { arg => ['double', mt('v3',3), mt('double',2)], out => ['v3'] },
	ldn => { arg => ['ldblen','lbody', mt('v3',2)], out => ['v3'] },
	ldsun => { arg => [mt('v3',2), 'double'], out => ['v3'] },
	num00a => { arg => ['stime','stime'], out => ['mat33'] },
	num00b => { arg => ['stime','stime'], out => ['mat33'] },
	num06a => { arg => ['stime','stime'], out => ['mat33'] },
	numat => { arg => ['sangle','sangle','sangle'], out => ['mat33'] },
	nut00a => { arg => ['stime','stime'], out => ['double','double'] },
	nut00b => { arg => ['stime','stime'], out => ['double','double'] },
	nut06a => { arg => ['stime','stime'], out => ['double','double'] },
	nut80 => { arg => ['stime','stime'], out => ['double','double'] },
	nutm80 => { arg => ['stime','stime'], out => ['mat33'] },
	obl06 => { arg => ['stime','stime'], rv => 'double' },
	obl80 => { arg => ['stime','stime'], rv => 'double' },
	p2pv => { arg => ['v3'], out => ['pv3'] },
	p2s => { arg => ['v3'], out => ['double','double','double'] },
	p06e => { arg => ['stime','stime'], out => [mt('double', 16)] },
	pap => { arg => ['v3', 'v3'], rv => 'double' },
	pas => { arg => [mt('sdouble', 4)], rv => 'double' },
	pb06 => { arg => [mt('stime', 2)], out => [mt('double',3)] },
	pdp => { arg => ['v3','v3'], rv => 'double' },
	pfw06 => { arg => ['stime','stime'], out => [mt('double', 4)] },
	plan94 => { arg => ['stime','stime','int'], out => ['pv3'], rv => 'int' },
	pm => { arg => ['v3'], rv => 'double' },
	pmat00 => { arg => [mt('stime', 2)], out => ['mat33'] },
	pmat06 => { arg => [mt('stime', 2)], out => ['mat33'] },
	pmat76 => { arg => [mt('stime', 2)], out => ['mat33'] },
	pmp => { arg => [mt('v3', 2)], out => ['v3'] },
	pmpx => { arg => [mt('sdouble', 7),'v3'], out => ['v3'] },
	pmsafe => { arg => [mt('sdouble', 10)], out => [mt('double', 6)], rv => 'int' },
	pn => { arg => ['v3'], out => ['double','v3'] },
	pn00 => { arg => ['stime','stime','sdouble','sdouble'], out => ['double',mt('mat33',5)], mod => 15 },
	pn00a => { arg => ['stime','stime'], out => [mt('double',2),'sdouble',mt('mat33',5)], mod => 5 },
	pn00b => { arg => ['stime','stime'], out => [mt('double',2),'sdouble',mt('mat33',5)], mod => 3 },
	pn06 => { arg => ['stime','stime','double','vsdouble'], out => ['double',mt('mat33',5)], mod => 15 },
	pn06a => { arg => ['stime','stime'], out => [mt('double',3),mt('mat33',5)] },
	pnm00a => { arg => ['stime','stime'], out => ['mat33'] },
	pnm00b => { arg => ['stime','stime'], out => ['mat33'] },
	pnm06a => { arg => ['stime','stime'], out => ['mat33'] },
	pnm80 => { arg => ['stime','stime'], out => ['mat33'] },
	pom00 => { arg => [mt('sdouble',3)], out => ['mat33'] },
	ppp => { arg => ['v3','v3'], out => ['v3'] },
	ppsp => { arg => ['v3','double','v3'], out => ['v3'] },
	pr00 => { arg => [mt('stime', 2)], out => [mt('double', 2)] },
	prec76 => { arg => [mt('stime', 4)], out => [mt('double', 3)] },
	pv2p => { arg => ['pv3'], out => ['v3'] },
	pv2s => { arg => ['pv3'], out => [mt('double', 6)] },
	pvdpv => { arg => ['pv3','pv3'], out => ['v2'] },
	pvm => { arg => ['pv3'], out => ['double','double'] },
	pvmpv => { arg => ['pv3','pv3'], out => ['pv3'], mod => 8 },
	pvppv => { arg => ['pv3','pv3'], out => ['pv3'], mod => 4 },
	pvstar => { arg => ['pv3'], out => [mt('double', 6)], rv => 'int' },
	pvtob => { arg => [mt('sdouble', 7)], out => ['pv3'] },
	pvu => { arg => ['sdouble','pv3'], out => ['pv3'] },
	pvup => { arg => ['double','pv3'], out => ['v3'] },
	pvxpv => { arg => ['pv3','pv3'], out => ['pv3'], mod => 10 },
	pxp => { arg => ['v3','v3'], out => ['v3'] },
	refco => { arg => [mt('double', 4)], out => [mt('double',2)] },
	rm2v => { arg => ['mat33'], out => ['v3'] },
	rv2m => { arg => ['v3'], out => ['mat33'], reuse => 1 },
	rx => { arg => ['double'], out => ['mat33'], reuse => 1 },
	rxp => { arg => ['mat33', 'v3'], out => ['v3'] },
	rxpv => { arg => ['mat33', 'pv3'], out => ['pv3'] },
	rxr => { arg => ['mat33','mat33'], out => ['mat33'] },
	ry => { arg => ['double'], out => ['mat33'], reuse => 1 },
	rz => { arg => ['double'], out => ['mat33'], reuse => 1 },
	s00 => { arg => ['stime','stime','double','sdouble'], rv => 'double' },
	s00a => { arg => ['stime','stime'], rv => 'double' },
	s00b => { arg => ['stime','stime'], rv => 'double' },
	s2c => { arg => [mt('double', 2)], out => ['v3'] },
	s2p => { arg => [mt('double', 3)], out => ['v3'] },
	s2pv => { arg => [mt('sdouble', 6)], out => ['pv3'] },
	s2xpv => { arg => [mt('sdouble', 2), 'pv3'], out => ['pv3'] },
	s06 => { arg => ['stime','stime','double','double'], rv => 'double' },
	s06a => { arg => ['stime','stime'], rv => 'double' },
	sepp => { arg => [mt('v3',2)], rv => 'double' },
	seps => { arg => [mt('sdouble', 4)], rv => 'double' },
	sp00 => { arg => [mt('stime', 2)], rv => 'double' },
	starpm => { arg => [mt('double', 4), mt('double', 6)], out => [mt('double',6)], rv => 'int' },
	starpv => { arg => [mt('double', 2), mt('sdouble', 4)], out => ['pv3'], rv => 'int' },
	sxp => { arg => ['double', 'v3'], out => ['v3'] },
	sxpv => { arg => ['double', 'pv3'], out => ['pv3'] },
	taitt => { arg => [mt('double', 2)], out => [mt('double', 2)], rv => 'int' },
	taiut1 => { arg => [mt('double', 3)], out => [mt('double', 2)], rv => 'int' },
	taiutc => { arg => [mt('double', 2)], out => [mt('double', 2)], rv => 'int' },
	tcbtdb => { arg => [mt('double', 2)], out => [mt('double', 2)], rv => 'int' },
	tcgtt => { arg => [mt('double', 2)], out => [mt('double', 2)], rv => 'int' },
	tdbtcb => { arg => [mt('double', 2)], out => [mt('double', 2)], rv => 'int' },
	tdbtt => { arg => [mt('double', 3)], out => [mt('double', 2)], rv => 'int', mod => 3 },
	tf2a => { arg => ['sign',mt('int',2),'int'], out => ['double'], rv => 'int' },
	tf2d => { arg => ['sign',mt('int',2),'int'], out => ['double'], rv => 'int' },
	tttai => { arg => [mt('double', 2)], out => [mt('double', 2)], rv => 'int' },
	tttcg => { arg => [mt('double', 2)], out => [mt('double', 2)], rv => 'int' },
	tttdb => { arg => [mt('double', 3)], out => [mt('double', 2)], rv => 'int' },
	ttut1 => { arg => [mt('double', 3)], out => [mt('double', 2)], rv => 'int' },
	tr => { arg => ['mat33'], out => ['mat33'] },
	trxp => { arg => ['mat33', 'v3'], out => ['v3'] },
	trxpv => { arg => ['mat33', 'pv3'], out => ['pv3'] },
	ut1tai => { arg => [mt('double', 3)], out => [mt('double', 2)], rv => 'int' },
	ut1tt => { arg => ['ut11','ut12','dt'], out => [mt('double', 2)], rv => 'int' },
	ut1utc => { arg => [mt('double', 3)], out => [mt('double', 2)], rv => 'int' },
	utctai => { arg => [mt('stime', 2)], out => [mt('double', 2)], rv => 'int' },
	utcut1 => { arg => [mt('double', 2),'sdouble'], out => [mt('double', 2)], rv => 'int' },
	xy06 => { arg => [mt('stime', 2)], out => [mt('double', 2)], skip => 5 },
	xys00a => { arg => [mt('stime', 2)], out => [mt('double', 3)] },
	xys00b => { arg => [mt('stime', 2)], out => [mt('double', 3)] },
	xys06a => { arg => [mt('stime', 2)], out => [mt('double', 3)] },
	zp => { out => ['v3'], reuse => 1 },
	zpv => { out => ['pv3'], reuse => 1 },
	zr => { out => ['mat33'], reuse => 1 },
	ltpequ => { arg => ['stime'], out => ['v3'] },
	ltpecl => { arg => ['stime'], out => ['v3'] },
	ltpb => { arg => ['stime'], out => ['mat33'] },
	ltp => { arg => ['stime'], out => ['mat33'] },
	lteqec => { arg => ['stime',mt('double',2)], out => ['double','double'] },
	ltecm => { arg => ['stime'], out => ['mat33'] },
	lteceq => { arg => ['stime',mt('double',2)], out => ['double','double'] },
	icrs2g => { arg => [mt('double',2)], out => ['double','double'] },
	g2icrs => { arg => [mt('double',2)], out => ['double','double'] },
	eqec06 => { arg => [mt('stime',2),mt('double',2)], out => [mt('double',2)] },
	ecm06 => { arg => [mt('stime',2)], out => ['mat33'] },
	eceq06 => { arg => [mt('stime',2),'double','sdouble'], out => [mt('double',2)] },
	# added with release 14
	ae2hd => { arg => [mt('sangle',3)], out => [mt('double',2)] },
	hd2ae => { arg => [mt('sangle',3)], out => [mt('double',2)] },
	hd2pa => { arg => [mt('double',3)], out => [], rv => 'double' },
	tpors => { arg => [mt('double',4)], out => [mt('double',4)], rv => 'int' },
	tporv => { arg => [mt('sdouble',2),'v3'], out => [mt('v3',2)], rv => 'int' },
	tpsts => { arg => [mt('double',4)], out => [mt('double',2)] },
	tpstv => { arg => [mt('double',2),mt('v3',1)], out => [mt('v3',1)] },
	tpxes => { arg => [mt('double',4)], out => [mt('double',2)], rv => 'int' },
	tpxev => { arg => [mt('v3',2)], out => [mt('double',2)], rv => 'int' },
);

################################################################################
# normalize some options in config
################################################################################

foreach my $name (sort keys %config) {

	my $v3 = 0; my $mod = -1;
	$config{$name}->{'arg'} = [] unless $config{$name}->{'arg'};
	foreach (@{$config{$name}->{'arg'} || []}) {
		if ($_ eq "lbody") { $_ = "iauLDBODY" }
		elsif ($_ eq "astrom") { $_ = "iauASTROM" }
		elsif ($_ eq "mat33") { $v3 += 3 }
		elsif ($_ eq "pv3") { $v3 += 2 }
		elsif ($_ eq "p3") { $v3 += 1 }
		elsif ($_ eq "v3") { $v3 += 1 }
		else { $mod ++; }
	}
	# $v3 += 2 if ($name eq "apco");
	$mod += $v3;
	my @args = @{$config{$name}->{'arg'} || []};
	$config{$name}->{'modV3'} = ($v3 * 4) ** ($v3) if ($v3 > 1 && scalar(@args) > 1);
	$config{$name}->{'mod'} = 1 unless exists ($config{$name}->{'mod'});
	$config{$name}->{'mod'} *= 5 if (scalar(@args) == 1 && $args[0] eq "mat33");
	$config{$name}->{'mod'} *= int($mod ** ($mod - 1.7)) if ($mod > 2);
	delete $config{$name}->{'mod'} if $config{$name}->{'mod'} < 2;
	foreach (@{$config{$name}->{'out'} || []}) {
		if ($_ eq "sign") { $_ = "char" }
		elsif ($_ eq "iy") { $_ = "int" }
		elsif ($_ eq "lbody") { $_ = "iauLDBODY" }
		elsif ($_ eq "astrom") { $_ = "iauASTROM" }
	}
}

################################################################################
################################################################################

sub create_test {
	my ($name, $config, $rnames, $args, $outs) = @_;

	my $i;

	my $assertions = "";

	# create strings for tests
	$i = 0; my $fnargs = join(", ", map { sprintf("tests[i][%s]", $i++) } @{$args});
	$i = 0; my $inargs = join(" +', '+ ", map { sprintf('JSON.stringify(tests[i][%s])', $i++) } @{$args});

	$inargs = "'void'" if (scalar(@{$args}) == 0);

	for (my $n = 0; $n < scalar(@{$outs}); $n ++) {

		my $pfx = (scalar(@{$outs}) > 1) ? "[$n]" : "";

		my $itype = $itypes{$outs->[$n]};
		my $otype = $vtypes{$outs->[$n]};
		$otype = $vtypes{$itype->{'vtype'}} unless $otype && $itype;
		my $assert = $otype->{'assert'};
		die "no assert for $outs->[$n]" unless $assert;

		if ($assert eq "equal") {
			$assertions .= "				assert.$assert(res${pfx}, tests[i][".($i++)."], $inargs + ' (" . $rnames->[$n] . ")');\n";
		}
		else {
			my $eps = $otype->{'epsilon'};
			die "no epsilon for $outs->[$n]" unless $eps;
			$assertions .= "				assert.$assert(res${pfx}, tests[i][".($i++)."], $eps, $inargs + ' (" . $rnames->[$n] . ")');\n";
		}
	}

	my $tmpl = <<EOTST;
(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "$name", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauFname($fnargs);
$assertions
			}
		});
	});

})(fname_results);
EOTST


	$tmpl =~ s/fname/lc $name/eg;
	$tmpl =~ s/Fname/ucfirst $name/eg;

	open(my $fh, ">", "$root/test/iau/$name.chk.js");
	die "could not write '$root/test/iau/$name.chk.js'\n" unless $fh;
	print $fh $tmpl; close $fh;

}

################################################################################
################################################################################

sub create_docu {
	my ($name, $config, $text, $rnames, $args, $rets, $groups) = @_;

	my $proto = $config->{'proto'};

	my $ret = "";
	my @outv;

	my $group = "";
	my $extract = "";

	$text =~ s/^\s*\/\*//;
	$text =~ s/^\*\* {0,2}//gm;
	$text =~ s/\*\/\s*\z//;

	$text =~ s/\nThis function is part of the International Astronomical Union\'s\n//;
	$text =~ s/SOFA \(Standards Of Fundamental Astronomy\) software collection.\n\n//;

	if ($text =~ s/^Status:\s*(.*?)\s*$//m) {
		$group = $1;
		$group =~ s/^\s*//;
		$group =~ s/\.\s*$//;
	}

	$group = "support function" if ($name eq "ae2hd");

	if ($text =~ m/- - -\n\n((?:[^\n]+\n)+)/) {
		$extract = " - $1";
		$extract =~ s/[\r\n\s]+/ /g;
		chomp($extract);
	}

	$text =~ s/(\A|\n)\s*- -(?: -)+\r?(?:\n|\z)/$1/g;
	$text =~ s/\s*See notes at end.\s*\z//;

	push @outv, "rv" if ($config->{'rv'});
	if ($text =~ m/^Returned[^:]*:\s*(?:\r?\n)+((?:   [^\n]+\r?\n)+)/m) {
		my @decl = split(/\s*\n\s*/, $1);
		foreach my $decl (@decl) {
			if ($decl =~ m/^\s*($re_identifier(?:\s*,\s*$re_identifier)*)/) {
				push @outv, split(/\s*,\s*/, $1);
			}
		}
	}

	if (scalar(@outv) == 1) {
		$ret = $outv[0] . " = ";
	} elsif (scalar(@outv) > 1) {
		$ret = "[" . join(", ", @outv) . "] = ";
	}

	$text =~ s/ i a u((?: [A-Za-z0-9])+)\r?\n/"# iau" . (ucfirst($name)) . "\n" .
		"\n```js\n${ret}IAU." . $name . "(" . $proto . ")\n```\n"
	/e;

	die "missing function group" unless ($group);
	$groups->{$group} = [] unless exists $groups->{$group};
	push(@{$groups->{$group}}, [$name, $extract]);

	$text =~ s/(References?)?(:(?:\r?\n)+)((?:\n*(?:    [^\n]+)\n|(?:   [^\n]+)\n)+)/$1 ? $& : "$2```\n$3```\n"/eg;

	$text =~ s/^([A-Za-z0-9][A-Za-z0-9 \(\)]+:\n)/## $1/gm;
	$text =~ s/## Status:/Status:/g;

	print "write $root/docs/iau.$name.md\n";
	my $rv = open(my $fh, ">", "$root/docs/iau.$name.md");
	die "could not write '$root/docs/iau.$name.md'\n" unless $rv;
	print $fh $text; close $fh;

}

################################################################################
################################################################################

sub create_spec {
	my ($name, $config, $rnames, $args, $rets) = @_;

	my $rv = 'double';

	my ($loop_beg, $loop_end, @args, @prefixes, @postfixes, @decl, @odecl, @loops) = ("", "");
	# create loops for input variables
	my $ind = 0;
	my $body = "";

	#***************************************************************************
	# process all input arguments
	#***************************************************************************
	for (my $i = 0; $i < scalar(@{$config->{'arg'} || []}); $i ++)
	{

		my $cfg = $config->{'arg'};
		my $input = $cfg->[$i];
		my $itype = $itypes{$input};
		die "no input type $input" unless $itype;
		my ($multi, $beg, $end, $d, $type) = (1, 0, 1, 1, 'double');
		$multi = $itype->{'multi'} if exists $itype->{'multi'};
		$type = $itype->{'type'} if exists $itype->{'type'};
		$beg = $itype->{'beg'} if exists $itype->{'beg'};
		$end = $itype->{'end'} if exists $itype->{'end'};
		$d = $itype->{'d'} if exists $itype->{'d'};

		my $vtype = $vtypes{$itype->{'vtype'}};
		die "no var type $itype->{'vtype'}" unless $vtype;
		if (exists $vtype->{'decl'}) {
			my $var = sprintf($vtype->{'var'}, $i);
			my $arg = sprintf($vtype->{'arg'}, $var);
			push @decl, sprintf($vtype->{'decl'}, $var);
			push @prefixes, sprintf($vtype->{'c2json'}, $var);
			push @args, $arg;
		}

		my $vn = "t${i}";

		if ($itype->{'vtype'} eq "v3" || $itype->{'vtype'} eq "mat33") {
			if (my $modx = $config->{'modV3'}) {
				$loop_beg .= ("  " x $ind) . "  long mod${i} = 0;\n";
			}
		}

		$ind ++;
		for (my $m = 0; $m < $multi; $m++) {
			push @loops, [$beg, $end, $d];
			my $itype = $itypes{$input};
			my $ind2 = $ind;
			# my $i = scalar(@loops);
			if ($itype->{'vtype'} eq "dmsf") {
				$loop_beg .= ("  " x $ind2) . "for (${vn}[$m] = $beg; ${vn}[$m] <= $end; ${vn}[$m] += $d) {\n";
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;
			}
			elsif ($itype->{'vtype'} eq "v3" || $itype eq "v3") {
				$loop_beg .= ("  " x $ind2) . "for (${vn}[$m] = $beg; ${vn}[$m] <= $end; ${vn}[$m] += $d) {\n";
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;
			}
			elsif ($itype->{'vtype'} eq "v2") {
				$loop_beg .= ("  " x $ind2) . "for (${vn}[$m] = $beg; ${vn}[$m] <= $end; ${vn}[$m] += $d) {\n";
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;
			}
			elsif ($itype->{'vtype'} eq "pv3") {
				$loop_beg .= ("  " x $ind2) . "for (${vn}[0][$m] = $beg; ${vn}[0][$m] <= $end; ${vn}[0][$m] += $d) {\n";
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;
				$loop_beg .= ("  " x $ind2) . "for (${vn}[1][$m] = $beg; ${vn}[1][$m] <= $end; ${vn}[1][$m] += $d) {\n";
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;
			}
			elsif ($input eq "tscale") {
				push @decl, "int ti${i};";
				$loop_beg .= ("  " x $ind2) . "for (ti${i} = $beg; ti${i} <= $end; ti${i} += $d) { ${vn} = tscale[ti${i}];\n";
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;
			}
			elsif ($input eq "tcoord") {
				push @decl, "int ti${i};";
				$loop_beg .= ("  " x $ind2) . "for (ti${i} = $beg; ti${i} <= $end; ti${i} += $d) { ${vn} = tcoordt[ti${i}];\n";
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;
			}
			elsif ($input eq "iauLDBODY") {
				push @decl, "int ti${i};";
				$loop_beg .= ("  " x $ind2) . "for (ti${i} = $beg; ti${i} <= $end; ti${i} += $d) {\n";
				$body = ("  " x $ind2) . "  ${vn}[0] = lbodys[t".($i-1)."];\n" . $body;
				$body = ("  " x $ind2) . "  ${vn}[1] = lbodys[2];\n" . $body;
				$body = ("  " x $ind2) . "  ${vn}[2] = lbodys[1];\n" . $body;
				$body = ("  " x $ind2) . "  ${vn}[3] = lbodys[0];\n" . $body;
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;

				push @decl, "iauLDBODY ${vn}[100];";
				push @args, "${vn}";
				push @prefixes, "exportLDBODY(t".($i-1).", ${vn})";

			} elsif ($input eq "iauASTROM") {

				push @decl, "int ti${i};";
				$loop_beg .= ("  " x $ind2) . "for (ti${i} = $beg; ti${i} <= $end; ti${i} += $d) {\n";
				$body = ("  " x $ind2) . "  ${vn} = astroms[ti${i}];\n" . $body;
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;

			}
			elsif ($input eq "mat33") {
				# some function overwrite our input
				# this makes our loops go haywire
				push @decl, "double _${vn}[3][3]";
				$body .= ("  " x $ind2) . "  memcpy(&${vn}, &_${vn}, sizeof ${vn});\n";
				for (my $i1 = 0; $i1 < 3; $i1 ++) {
					for (my $i2 = 0; $i2 < 3; $i2 ++) {
						$loop_beg .= ("  " x $ind2) . "for (_${vn}[$i1][$i2] = $beg; _${vn}[$i1][$i2] <= $end; _${vn}[$i1][$i2] += $d) {\n";
						$loop_end = ("  " x $ind2) . "}\n" . $loop_end;
					}
				}
			} elsif ($input eq "int") {
				$loop_beg .= ("  " x $ind2) . "for (${vn} = $beg; ${vn} <= $end; ${vn} += $d) {\n";
				#$loop_beg .= ("  " x $ind2) . "for (${vn} = 0; ${vn} <= 2; ${vn} += 1) {\n";
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;
			} else {
				$loop_beg .= ("  " x $ind2) . "for (${vn} = $beg; ${vn} <= $end; ${vn} += $d) {\n";
				$loop_end = ("  " x $ind2) . "}\n" . $loop_end;
			}
		}
		if ($itype->{'vtype'} eq "v3" || $itype->{'vtype'} eq "mat33") {
			if (my $modx = $config->{'modV3'}) {
				$loop_beg .= ("  " x $ind) . "  mod${i} ++;\n";
				$loop_beg .= ("  " x $ind) . "  if (mod${i} > $modx) mod${i} = 0;\n";
				$loop_beg .= ("  " x $ind) . "  if (mod${i} != 1) continue;\n";
			}
		}
	}
	my $iauFn = "iau" . ucfirst $name;
	my $indent = "  " x ($ind + 1);

	# prepare the output values
	my @rets = @{$config->{'out'} || []};
	for(my $i = 0; $i < scalar(@rets); $i++) {
		my $itype = $itypes{$rets[$i]};
		my $vtype = $vtypes{$itype->{'vtype'}};
		my $var = sprintf($vtype->{'res'}, $i);
		my $pass = sprintf($vtype->{'pass'}, $var);
		push @odecl, sprintf($vtype->{'decl'}, $var);
		push @postfixes, sprintf($vtype->{'c2json'}, $var);
		push @args, $pass;
		# $body = $indent . "memset(&$var, 0, sizeof($var));\n" . $body;
	}

	# prepare iau function call
	my $argstr = join(", ", @args);
	my $call = "${iauFn}($argstr)";
	# prepare return value from call
	if (my $rvt = $config->{'rv'}) {
		my $itype = $itypes{$rvt};
		my $vtype = $vtypes{$itype->{'vtype'}};
		push @prefixes, sprintf($vtype->{'c2json'}, $call);
		$call = "";
	}

	$body .= $indent . "printf(\"  [\");\n";
	$body .= join($indent . "printf(\", \");\n", map { $indent . $_ . ";\n" } @prefixes);
	$body .= $indent . "printf(\", \");\n" if (scalar(@postfixes) && scalar(@prefixes));
	$body .= $indent . $call . ";\n" if $call ne ""; # call without return value
	$body .= join($indent . "printf(\", \");\n", map { $indent . $_ . ";\n" } @postfixes);
	$body .= $indent . "printf(\"  ],\\n\");\n";

	my $decl = join("\n", map { "  $_;" } @decl);
	my $odecl = join("\n", map { $indent . $_ . " = {0};" } @odecl);

	if ($config->{'mod'}) {
		my $mod = $config->{'mod'};
		$body = $indent . "modulo = modulo > $mod\n"
		      . $indent . "  ? 0 : modulo + 1;\n"
		      . $indent . "if (modulo != 1) continue;\n"
		      . $body;
		$decl .= "\n  unsigned long long modulo = 0;";
	}

	my $tmpl = <<EOTMPL;
/* Generate Test Data for ${name} */

#include <stdio.h>
#include "sofa.h"
#include "config.h"
#include <string.h>

int main()
{
${decl}
  printf("var ${name}_results = [\\n");
${loop_beg}
${odecl}
${body}
${loop_end}
  printf("];\\n");
}
EOTMPL

	$tmpl =~ s/fname/lc $name/eg;
	$tmpl =~ s/Fname/ucfirst $name/eg;

	my $frv = open(my $fh, ">", "$root/gen/src/$name.c");
	die "could not write '$root/gen/src/$name.c'\n" unless $frv;
	print $fh $tmpl; close $fh;
}
# EO create specs

################################################################################
# some regex helper functions
################################################################################

sub convert_term {
	my ($var, $body) = @_;
	my $code = "var $var = [";
	$body =~ s/\{\{([^\}]+)\},([^\}]+)\}/[$1, $2]/g;
	return $code . $body . "];\n";
}

sub convert_var_decl {
	my ($args) = @_;
	my @args = split /\s*,\s*/, $args;
	foreach (@args) {
		s/($re_identifier)\[(\d+)\]\[\d+\]/"$1 = [".join(", ", map { "[]" } (1..$2) )."]"/e;
		s/($re_identifier)\[$re_arr_size\]/$1 = []/;
	}
	return "var " . join(", ", @args) . ";";
}

sub convert_int_div {
	my ($a, $b) = @_;
	$a =~ s/\((?:long|int)\)\s*//g;
	$b =~ s/\((?:long|int)\)\s*//g;
	$a =~ s/\(($re_ops)\s*\/\s*(\d+L)\)/~~(($1) \/ $2)/g; #
	$a =~ s/(\d+)L/$1/g;
	$b =~ s/(\d+)L/$1/g;
	return "~~(($a) \/ $b)"
}

sub hoist_call {
	my ($name, $args, $m, $_config, $fname, $decl, $wrap) = @_;
	return "var __rv__ = iau$name($args);\n   if(__rv__)";
}

sub convert_call {
	my ($name, $args, $m, $_config, $fname, $decl, $wrap) = @_; my @rvs;

	my $config = $_config->{$fname};
	my @args = $args ne "" ? split /\s*,\s*/, $args : ();
	s/^[\&\*]// foreach @args;
	my $cfg = $_config->{lc $name};
	# warn $fname, ": ", $name, ": ", $cfg->{'reuse'};
	for(my $i = 0; $i < scalar(@{$cfg->{'out'} || []}); $i++) {
		if ($cfg->{'reuse'}) {
			unshift(@rvs, $args[-1-$i]);
		} else {
			unshift(@rvs, pop(@args));
		}
	}

	my $code;
	$args = join(", ", @args);
	if ($cfg->{'reuse'}) {
		if ($cfg->{'rv'}) {
			$code = "$rvs[0] = iau${name}(${args})[1]";
		} else {
			$code = "$rvs[0] = iau${name}(${args})";
		}
	}
	if (scalar(@rvs) == 0) {
		$code = "iau${name}(${args})";
	}
	elsif (scalar(@rvs) == 1 && !$cfg->{'rv'}) {
		if ($cfg->{'rv'}) {
			$code = "$rvs[0] = iau${name}(${args})[1]";
		} else {
			$code = "$rvs[0] = iau${name}(${args})";
		}
	}
	else {
		push @{$decl}, "_rv${m}";
		if ($wrap) {
			$code = "_rv${m} = iau${name}(${args});";
		} else {
			$code = "(_rv${m} = iau${name}(${args}))[0]";
		}
		for (my $n = 0; $n  < scalar(@rvs); $n++) {
			my $nn = $cfg->{'rv'} ? $n + 1 : $n;
			$code .= ";\n   $rvs[$n] = _rv${m}[$nn]"
		}
	}
	if ($wrap) {
		$code = "((function(){ $code;
 RETURN _rv${m}[0];
})())";
	}
	$_[2] ++;
	return $code;
}

sub convert_fn
{

	my ($rvt, $fn, $proto, $config, $fname, $ptrs, $onames, $rnames, $ints, $floats) = @_;

	# remove all attached types (manualy hardcoded in config -> could be automated more)
	$proto =~ s/(?:int\s+|double\s+|char\s*\*?|iauASTROM\s*\*?|iauLDBODY\s*(?:\*|\[\])?)//g;

	# normalize passed arrays (no length[x] needed in JS)
	$proto =~ s/($re_identifier)(?:\[$re_arr_size?\])+/$1/g;

	# get the involved config arrays
	my @args = @{$config->{'arg'} || []};
	my @outs = @{$config->{'out'} || []};
	my @proto = split /\s*,\s*/, $proto;

	# do a very basic sanity check for valid config
	if (scalar(@proto) ne scalar(@args) + scalar(@outs)) {
		warn "proto: ", join(", ", @proto), "\n";
		warn "args: ", join(", ", @args), "\n";
		warn "outs: ", join(", ", @outs), "\n";
		die "$fn has argument length mismatch";
	}

	# add return value
	if ($config->{'rv'}) {
		push @{$rnames}, '[RV]';
	}
	# collect and store input arguments
	for (my $i = 0; $i < scalar(@outs); $i++) {
		my $v = $proto[scalar(@args) + $i];
		$v =~ s/^[\*\&]//;
		my $ot = $outs[$i];
		push @{$onames}, $v;
		push @{$rnames}, $v;
		# basic types
		if ($ot eq "double") {
			$ptrs->{$v} = 1;
			$floats->{$v} = 1;
		}
		elsif ($ot eq "int") {
			$ptrs->{$v} = 1;
			$ints->{$v} = 1;
		}
	}
	# remove passed values from input prototype
	unless ($config->{'reuse'} && $config->{'arg'}) {
		for (my $i = 0; $i < scalar(@outs); $i++) { pop(@proto); }
	}

	# store directly in config for later
	$config->{'proto'} = join ", ", @proto;

	# return function definition with arguments
	return sprintf('function %s(%s)', $fn, join ", ", @proto);
}

################################################################################
# main function to convert a function
################################################################################
sub convert_astro_fn
{
	# input arguments
	my ($fname, $src, $status) = @_;
	# get my configuration
	my $config = $config{$fname};
	# variable names from C
	my (@anames, @onames, @rnames);
	# var usages in C function
	my (%ints, %floats, %structs);
	# store comment blocks
	my (@comments);

	# replace all coments with a placeholder (do not alter)
	$src =~ s/(\/\*.*?\*\/)/remove_comments($1, \@comments)/egs;

	# remove all C header includes
	# headers were converted manually
	$src =~ s/(?:\#include (?:\<[^\>]*\>|$re_string)\s*)+//g;

	my @decl;
	my $id = 1;
	my $ptrs = {};

	# get the involved config arrays
	my @args = @{$config->{'arg'} || []};
	my @outs = @{$config->{'out'} || []};
	my @rets = @{$config->{'out'} || []};
	# prepend return value
	if ($config->{'rv'}) {
		unshift @rets, $config->{'rv'};
	}


	# convert char assignments (just remove casting)
	$src =~ s/\*($re_identifier)\s*=\s*(?:\(char\)\s+)?/$1 = /g;

	my $re_opss = qr/(?:\((?:long|int)\)\s*\((?:$re_ops)\)|$re_ops)/;
	# convert integer divisions (pretty specific but catches all iau cases) - truncate the results
	$src =~ s/\((\s*(?:\d+L\s*[\*\+\-\/])?\s*$re_opss)\)\s*\/\s*(\d*)L/convert_int_div($1, $2)/eg;

	# convert integer numbers
	$src =~ s/\b(\d+)L\b/$1/g;

	# remove variable modifiers
	$src =~ s/(static|const)\s+//g;

	# re-organize iau function calls; in C some functions take basic value types pointers
	# this enables the function to update those variables directly (much like $_[0] in perl)
	# in JS this is only possibly via i.e. array references, but I've choosen to implement
	# the function is JS to return an array if more than once output value is configured.
	# NOTE: this also depends on whether or not the iau functions has a return value!
	# we need to assign the output from the JS return array to the variables after the call
	$src =~ s/if\s*\(\s*iau([A-Z][a-z0-9]+)\s*\(\s*($re_arg)\s*\)\s*\)/hoist_call($1, $2, $id, \%config, $fname, \@decl, 1)/ge;
	$src =~ s/iau([A-Z][a-z0-9]+)\s*\(\s*($re_arg)\s*\)/convert_call($1, $2, $id, \%config, $fname, \@decl)/ge;

	# find the main function and its prototype with a very simple match
	# all iau functions only return basic value types, so this should work
	$src =~ s/^\s*(void|int|double|char)\s*($re_identifier)\s*\((.*?)\)/
		convert_fn($1, $2, $3, $config, $fname, $ptrs, \@onames, \@rnames, \%ints, \%floats)
	/gesx;

	# convert empty c struct var declaration (add initialization for js)
	$src =~ s/iauASTROM\s+($re_identifier);/"var " . initVar($1, "iauASTROM")/ge;
	$src =~ s/iauLDBODY\s+($re_identifier);/"var " . initVar($1, "iauLDBODY")/ge;

	# convert array sizes from complex C logic to simple array.length access in JS
	# in C the array length is determined by a complex sizeof logic (static for compilers)
	$src =~ s/enum\s*\{\s*($re_identifier)\s*=\s*\(int\)\s*\($re_sizeof_divs\s*\)\s*\}\s*;/var $1 = $2.length;/g;
	$src =~ s/int\s*($re_identifier)\s*=\s*\(int\)\s*\($re_sizeof_divs\s*\)/var $1 = $2.length/g;
	# in some function the array size is hardcoded directly in the source code
	$src =~ s/enum\s*\{\s*($re_identifier)\s*=\s*($re_nr)\s*\}\s*;/var $1 = $2;/g;
	$src =~ s/int\s*($re_identifier)\s*=\s*($re_nr)\s*\}\s*;/var $1 = $2;/g;

	# convert and recognize integer variables (needed for later assignments)
	# JS has no integer value, therefore we need to ensure to truncate operations
	$src =~ s/(?:int|long)\s*\*?\s*($re_s_var(?:\s*,\s*$re_s_var)*)/convert_int_decl($1, \%ints)/eg;

	# parse C arrays and convert them to
	$src =~ s/(?:double)\s*\*?\s*($re_s_var(?:\s*,\s*$re_s_var)*)/convert_float_decl($1, \%floats)/eg;

	#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	# recognition phase is over, all variables are parsed - convert
	#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	my $match_ints = join("|", sort keys %ints);
	# convert assignments to integer types (make sure js value is truncated)
	# the converter will also make sure to sanitize inner calculations (divisions) (TODO?)
	$src =~ s/\b($match_ints) ([-+\/*]?=) ([^;]+)/convert_int_asgn($1, $2, $3)/eg if $match_ints;

	# convert mathematical functions (accessible under Math. in JS)
	$src =~ s/\b(sin|cos|abs|atan2?|pow|sqrt|floor|ceil)\s*\(/Math.$1\(/g;
	# a few maths functions need renaming
	$src =~ s/f(abs)\(/Math.$1\(/g;

	# convert variable declarations; in C an array is declared as `vec[3]`, in JS this is `vec = []`
	# NOTE: this does not initialize the arrays with any values, in C all values will be initialized to 0
	$src =~ s/(?:var|double|int)\s+($re_va(?:\[$re_arr_size\])*(?:\s*,\s*$rc?\s*$re_va(?:\[$re_arr_size\])*)*);/convert_var_decl($1)/esg;

	my $match_ptr_vars = join("|", sort keys %{$ptrs});
	# convert pointer variables usage (remove star from c)
	# only basic c types that are used for output (updated)
	$src =~ s/\*($match_ptr_vars)\b/$1/eg if $match_ptr_vars;

	# convert struct access to object access
	$src =~ s/->($re_identifier)/.$1/g;

	$src =~ s/\(void\)\s*//g;

	my $idv = qr/\*?(?:$re_identifier)(?:\[(?:$re_identifier\s*\+\s*\d+|$re_identifier|\d*)\])+\s*=\s*(?:$re_array_def)/;
	$src =~ s/var\s*\*?($idv(?:\s*,\s*$idv)*)/parse_array($1, \%structs)/gse;

	# parse struct declarations and initialization (convert to a JS array and map to flat array access)
	$src =~ s/struct \{([^\}]*)\} ($re_identifier)\[\]\s*=\s*($re_array_def)/parse_struct($1, $2, $3, \%structs)/gse;

	my $match_structs = join("|", sort keys %structs);
	# ToDo: check what this is actually doing (needed by many functions)
	$src =~ s/($re_identifier)(\[[^\]]+\])\.($match_structs)\b/$1.$2.'['.$structs{$3}->{$1}.']'/ge if $match_structs;

	# convert TERM struct - since it is only used
	# internal, it's flattened to a single array
	$src =~ s/\.nfa\[([a-zA-Z0-9]+)\]/[$1]/g;
	$src =~ s/\.s\b/[8]/g; $src =~ s/\.c\b/[9]/g;
	# remove any inline declarations (targets TERM)
	$src =~ s/typedef struct \{[^\}]*\}\s+[A-Z]+;\s*//g;
	# specific parser for terms struct arrays
	$src =~ s/TERM ([a-zA-Z0-9]+)\[\]\s*=\s*\{(.*?)\};/convert_term($1, $2)/ges;
	# parse array with sizes (needed for epv00)
	$src =~ s/var ($re_sts)/parse_size_array($1)/es;

	# convert remaining basic types to JS
	$src =~ s/char\s+($re_identifier)/var $1/g;
	$src =~ s/\((?:int|long)\)\s*/~~/g;
	$src =~ s/\((?:double)\)\s*//g;

	# specific case needed only for epv00
	# generic solution would be pretty complex
	$src =~ s/a = \*coeffs\+\+/a = coeffs[j*3+0]/g;
	$src =~ s/b = \*coeffs\+\+/b = coeffs[j*3+1]/g;
	$src =~ s/c = \*coeffs\+\+/c = coeffs[j*3+2]/g;

	# needed for the coeffs c array declaration
	$src =~ s/var \*($re_identifier)/var $1/g;

	# convert some C integer functions to inline JS
	$src =~ s/dint\s*\(\s*($re_ops)\s*\)/~~($1)/g;
	# this is a bit odd, seems dnint(-1.5) is -2 not -1;
	# round will always round up, while dnint does not
	# $src =~ s/dnint\s*\(\s*($re_ops)\s*\)/Math.round($1)/g;
	# convert some C math functions to inline JS operations
	$src =~ s/fmod\s*\(\s*($re_ops)\s*,\s*($re_ops)\s*\)/(($1) % ($2))/g;
	$src =~ s/strcmp\s*\(\s*($re_ops)\s*,\s*($re_ops)\s*\)/(($1) !== ($2))/g;
	# we could also use ternary here, but perf should be on par nowadays
	# future JS engines may be able to further optimize Math.min with SSE2
	$src =~ s/g(min|max)\s*\(\s*($re_ops)\s*,\s*($re_ops)\s*\)/Math.$1($2, $3)/g;

	#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	# main convert is done, now do some post processing
	#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	if (scalar(@onames)) {

		# comma list of return values
		my $outs = join(", ", @onames);

		# has return value and additional values
		if ($config->{'rv'} && scalar(@rets) > 1) {
			$src =~ s/return ($re_ops);/return [ $1, $outs ];/g;
		}
		# only has a return value
		elsif ($config->{'rv'}) {
			$src =~ s/return ($re_ops);/return $1;/g;
		}
		# has multiple return values
		elsif (scalar(@rets) > 1) {
			$src =~ s/return;/return [$outs];/g;
		}
		# only a return value
		else {
			$src =~ s/return;/return $onames[0];/g;
		}

	}

	#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	my $fnhead = ""; # create
	#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

	if (scalar(@onames)) {
		for (my $i = 0; $i < scalar(@onames); $i++) {
			next if $config->{'reuse'} && $config->{'arg'};
			my $var = $onames[$i]; $var =~ s/^($re_identifier).*/$1/;
			$fnhead .= sprintf("   var %s;\n", initVar($var, $config->{'out'}->[$i]));
		}
	}

	# make sure certains types are valid for access
	for (my $i = 0; $i < @outs; $i++) {
		next if $outs[$i] ne "iauASTROM" && $outs[$i] ne "mat33" && ! $config->{'reuse'}; # && $outs[0] ne "double";
		$fnhead .= sprintf "   if (typeof %s == 'undefined') {\n", $onames[$i];
		$fnhead .= "      " . join("\n      ", initVar($onames[$i], $outs[0]));
		$fnhead .= "\n   }";
	}

	# start adding declarations for intermediate variables
	# these store i.e. function call results to assign afterwards
	$fnhead .= "   var " . join(", ", @decl) . ";" if (scalar(@decl));

	# add declarations right after fn opener
	$src =~ s/{\s*\n/{\n$fnhead\n\n/ if ($fnhead);

	# convert our own RETURNs back to real ones
	# once we add a JS RETURN we don't want it to be
	# recognised by any of the conversion code above!
	$src =~ s/RETURN/return/g;

	# make sure we have a final return statement
	# some void functions with passed output vars
	# have no return statement, add one for them
	unless ($src =~ m/\breturn\b/) {
		# create return value
		my $rr = $onames[0];
		if (scalar(@onames > 1)) {
			$rr = "[" . join(", ", @onames) . "]";
		}
		# append right before closing bracket
		# we assume each file has one function
		$src =~ s/}[^\}]+\z/return $rr;\n}/;
	}

	# some denormalizations (CHECK: obsolete?)
	$src =~ s/\~\~\(\'([a-zA-Z])\'\)/(\'$1\')/g;
	$src =~ s/c = \~\~\(\~\~type\[0\]\);/c = type[0];/g;

	$comments[-1] = $license;

	# finaly replace comment placeholders
	$src =~ s/\~COMMENT\~(\d+)\~/$comments[$1]/gs;

	create_test($fname, $config, \@rnames, \@args, \@rets);
	create_spec($fname, $config, \@rnames, \@args, \@rets);

	foreach my $comment (@comments) {
		if ($comment =~ m/ i a u /) {
			create_docu($fname, $config, $comment, \@rnames, \@args, \@rets, $status);
			last;
		}
	}

	return $src;
}

my $rvinc = open(my $incload, ">", "$root/test/inc.iau.js");
die "could not open $root/test/chk.iau.js" unless $rvinc;
my $rvchk = open(my $chkload, ">", "$root/test/chk.iau.js");
die "could not open $root/test/chk.iau.js" unless $rvchk;
my $spr_include_js = "document.write('<script src=\"%s\"></scr'+'ipt>');";

################################################################################
# evacuate all comments before conversion
################################################################################

# replace with placeholder
sub remove_comments {
	my ($msg, $comments) = @_;
	my $id = scalar(@{$comments});
	push @{$comments}, $msg;
	return "~COMMENT~$id~";
}

my %groups;
#**************************************************************************************************
foreach my $fname (sort keys %config) {
	# open and read in the full file
	my $file = "$root/data/src/$fname.c";
	print "read $root/data/src/$fname.c\n";
	my $rv = open(my $fh, "<", $file);
	warn "missin $file" && next unless $rv;
	my $src = join("", <$fh>); # poor mans slurp
	# invoke the main converted function
	$src = convert_astro_fn($fname, $src, \%groups);
	# open and write the converted js code
	open(my $out, ">", "$root/src/iau/$fname.js");
	print "write $root/src/iau/$fname.js\n";
	print $out $src; close($out);
	# write the js includes for the test runner
	print $incload sprintf($spr_include_js, "../src/iau/$fname.js"), "\n";
	unless ($config{$fname}->{'skip'}) {
		print $chkload sprintf($spr_include_js, "iau/$fname.rslt.js"), "\n";
		print $chkload sprintf($spr_include_js, "iau/$fname.chk.js"), "\n";
	}
}

my $rvofh = open(my $ofh, ">", "$root/functions.md");
die "could not open $root/functions.md" unless $rvofh;

foreach my $group (sort keys %groups) {
	print $ofh "### " . ucfirst($group) . ":\n\n";
	foreach my $fn (@{$groups{$group}}) {
		$fn->[1] =~ s/\s*$//;
		$fn->[1] =~ s/Time scale transformation:\s*//;
		$fn->[1] =~ s/Fundamental argument, IERS Conventions \(2003\):\s*/Fund\'Args IERS(2003): /;
		$fn->[1] =~ s/\s+SOFA \(Standards of Fundamental.*//;
		$fn->[1] =~ s/In the tangent plane projection/In tangent plane/g;
		my $avail = 76 - length($fn->[0]);
		print $ofh sprintf('  - [IAU.%1$s](docs/iau.%1$s.md)%2$s' . "\n", $fn->[0],
			(length($fn->[1]) > $avail ? substr($fn->[1], 0, $avail - 3) . '...' : $fn->[1])
		)
	}
	print $ofh "\n";
}