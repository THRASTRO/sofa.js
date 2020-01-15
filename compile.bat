cd gen
call create.bat
cd ..

REM Overwrite with hand-crafted file
call cp static\dat.js src\era\dat.js

call webmerge sofa.js