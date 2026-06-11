@echo off
setlocal EnableDelayedExpansion
color 0B

echo ========================================================
echo       PRODUCTIVE DASHBOARD - AUTO SETUP WIZARD
echo ========================================================
echo.
echo Welcome! This wizard will completely set up the dashboard,
echo install required software, configure the database, and
echo set it to start automatically in the background.
echo.
echo If anything goes wrong, you can safely close this window
echo and run setup.bat again.
echo.
pause

echo.
echo [1/5] Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Installing via Winget...
    echo You may be prompted for Administrator permissions.
    winget install OpenJS.NodeJS -e --source winget
    
    echo.
    echo ========================================================
    echo IMPORTANT: Node.js has been installed!
    echo However, Windows needs to refresh its environment variables.
    echo Please CLOSE this window, and DOUBLE-CLICK setup.bat again.
    echo ========================================================
    pause
    exit
) else (
    echo Node.js is already installed!
)

echo.
echo [2/5] Installing project dependencies...
call npm install
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Failed to install dependencies. Please check your internet connection.
    pause
    exit
)

echo.
echo [3/5] Configuring local SQLite database (Zero Setup Required!)...
echo Don't worry, SQLite is incredibly safe and stores all your data securely in a local file.
call npx prisma generate
call npx prisma db push
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Database setup failed.
    pause
    exit
)

echo.
echo [4/5] Building the dashboard for production...
call npm run build
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Failed to build the dashboard.
    pause
    exit
)

echo.
echo [5/5] Configuring Automatic Background Startup...
:: Generate the VBS script with the absolute path of the current directory
set "CURRENT_DIR=%~dp0"
:: Remove trailing backslash if present
if "%CURRENT_DIR:~-1%"=="\" set "CURRENT_DIR=%CURRENT_DIR:~0,-1%"

echo Set WshShell = CreateObject("WScript.Shell") > start_hidden.vbs
echo WshShell.CurrentDirectory = "%CURRENT_DIR%" >> start_hidden.vbs
echo WshShell.Run "npm start", 0, False >> start_hidden.vbs

:: Copy to Windows Startup folder
set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
copy /Y "start_hidden.vbs" "%STARTUP_FOLDER%\ProductiveDashboard.vbs" >nul

echo Startup script copied to your Startup folder successfully!

echo.
echo ========================================================
echo                 SETUP COMPLETE!
echo ========================================================
echo The dashboard is now fully installed and configured.
echo It will automatically start silently every time you turn
echo on your PC.
echo.
echo To start it RIGHT NOW without rebooting:
echo Double-click the 'start_hidden.vbs' file in this folder.
echo.
echo Finally, open Lively Wallpaper, click 'Add Wallpaper',
echo and enter: http://localhost:3000
echo.
echo Enjoy your Productive Dashboard!
echo ========================================================
pause
