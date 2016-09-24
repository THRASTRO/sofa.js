while(<>) {

	$_ =~ s/(-?)1.\#INF0*(?:e\+000)?/${1}Infinity/g; # Inf
	$_ =~ s/(-?)1.\#QN[Aa]N0*(?:e\+000)?/${1}NaN/g; # quiet NaN
	$_ =~ s/(-?)1.\#IND0*(?:e\+000)?/${1}NaN/g; # indeterminate
	print $_;
}