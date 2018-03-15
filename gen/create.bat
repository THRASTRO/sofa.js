@echo off
WHERE dmake >nul 2>nul;
IF %ERRORLEVEL% EQU 0 SET MAKE=dmake -P12
WHERE gmake >nul 2>nul;
IF %ERRORLEVEL% EQU 0 SET MAKE=gmake -j12
call %MAKE% CC=gcc clean && ^
call perl generate.pl && ^
call %MAKE% CC=gcc libs && ^
call %MAKE% CC=gcc bins
IF %ERRORLEVEL% NEQ 0 pause