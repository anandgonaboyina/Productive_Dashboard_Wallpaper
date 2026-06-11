' ================================================================
' WALLPAPER DASHBOARD — Server Launcher
' ================================================================
' This script starts the Next.js server silently (no window shown)
'
' HOW TO CUSTOMIZE:
'   If you move your project folder, update the path on line below
'   marked with [CHANGE THIS PATH]
'
' REQUIREMENTS:
'   - Node.js must be installed
'   - Run "npm run build" in your project folder first
'   - Project must have "start" script in package.json
' ================================================================

Set oShell = CreateObject("WScript.Shell")

' [CHANGE THIS PATH] — Replace with your actual project folder path
' Current project: D:\productivedashboard
Dim projectPath
projectPath = "D:\productivedashborad"

' [CHANGE THIS PORT] — Must match the port in your package.json
' Current port: 4321
' The "0" at the end means hidden window — do not change that
oShell.Run "cmd /c cd /d """ & projectPath & """ && npm run start", 0, False

' ================================================================
' TO VERIFY SERVER IS RUNNING:
'   Open browser and visit http://localhost:4321
'   If dashboard loads = server is running fine
'
' TO RESTART SERVER MANUALLY:
'   Just double-click this .vbs file again
' ================================================================