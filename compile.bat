cd gen
call perl generate.pl
call dmake CC=gcc libs -P8
call dmake CC=gcc bins -P8
cd ..

call webmerge sofa.js