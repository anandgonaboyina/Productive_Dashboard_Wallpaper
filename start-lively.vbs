' ================================================================
' WALLPAPER DASHBOARD — Lively Wallpaper Launcher
' ================================================================
' This script starts Lively Wallpaper silently after a short wait
' so the Next.js server has time to fully start first
'
' HOW TO CUSTOMIZE:
'   If Lively Wallpaper gets updated or reinstalled, the path
'   below marked [CHANGE THIS PATH] will need to be updated
'
' HOW TO FIND YOUR LIVELY PATH:
'   1. Search "Lively" in Start Menu
'   2. Right click → Open file location
'   3. Right click the shortcut → Properties
'   4. Copy the "Target" path
' ================================================================

Set oShell = CreateObject("WScript.Shell")
Set oFSO   = CreateObject("Scripting.FileSystemObject")

' [CHANGE THIS PATH] — Full path to your Lively.exe
' Current install location for Anand Kumar's PC:
Dim livelyPath
livelyPath = "C:\Program Files\WindowsApps\12030rocksdanister.LivelyWallpaper_1.0.163.0_x64__97hta09mmv6hy\Build\Lively.exe"

' ================================================================
' NOTE FOR OTHERS USING THIS FILE:
'   Lively installed from Microsoft Store uses a long random path
'   like the one above. Every PC will have a DIFFERENT folder name.
'   The folder name contains your version number and a random ID.
'
'   Common locations to check:
'   C:\Program Files\WindowsApps\12030rocksdanister.LivelyWallpaper_*
'   C:\Users\[YourName]\AppData\Local\Programs\Lively Wallpaper\Lively.exe
' ================================================================

' Check if Lively exists at the given path before launching
If oFSO.FileExists(livelyPath) Then
    ' The "0" means hidden/no window — do not change that
    oShell.Run """" & livelyPath & """", 0, False
Else
    ' If path is wrong, show a helpful error message
    MsgBox "Lively Wallpaper not found at:" & vbNewLine & vbNewLine & _
           livelyPath & vbNewLine & vbNewLine & _
           "Please open start-lively.vbs in Notepad and" & vbNewLine & _
           "update the livelyPath variable with your correct Lively.exe path.", _
           vbExclamation, "Wallpaper Dashboard — Path Error"
End If

' ================================================================
' TO FIND YOUR LIVELY VERSION FOLDER AUTOMATICALLY:
'   Open PowerShell and run this command:
'   Get-ChildItem "C:\Program Files\WindowsApps" -Filter "*Lively*" | Select Name
'   It will print your exact folder name
' ================================================================