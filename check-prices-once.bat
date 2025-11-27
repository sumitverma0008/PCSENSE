@echo off
echo ========================================
echo PCSensei One-Time Price Check
echo ========================================
echo.
echo Running AI price check...
echo.

node price-monitor.js --once

echo.
echo Press any key to exit...
pause > nul
