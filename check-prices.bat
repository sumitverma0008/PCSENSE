@echo off
echo ==========================================
echo   PCSensei - One-time Price Check
echo ==========================================
echo.
cd backend
node price-monitor.js --once
pause
