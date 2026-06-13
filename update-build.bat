@echo off
title Productive Dashboard - System Updater
color 0B

:: Check for Administrator privileges
net session >nul 2>&1
if %errorLevel% == 0 (
    goto :run_update
) else (
    echo Requesting Administrator Privileges...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

:run_update
:: Ensure we are in the script's directory
cd /d "%~dp0"

echo =======================================================
echo      PRODUCTIVE DASHBOARD - SYSTEM UPDATER
echo =======================================================
echo.

echo [1/4] STOPPING BACKGROUND SERVER...
call npx -y kill-port 4321
echo Server stopped.

echo.
echo [2/4] PULLING LATEST UPDATE FROM GITHUB...
call git fetch origin
call git reset --hard origin/main
echo Update pulled successfully.

echo.
echo [3/4] REBUILDING DASHBOARD SOURCE CODE...
call npm run build
if %errorLevel% neq 0 (
    color 0C
    echo.
    echo =======================================================
    echo ERROR: BUILD FAILED
    echo =======================================================
    echo Please check the error logs above.
    pause
    exit /b 1
)

echo.
echo [4/4] STARTING DASHBOARD SERVER...
echo =======================================================
echo UPDATE COMPLETE! 
echo The updated server is starting. You can close this window once it says "Ready".
echo =======================================================
call npm run start
