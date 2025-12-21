@echo off
echo ==========================================
echo   PCSensei - Continuous Price Monitoring
echo ==========================================
echo.
echo Starting continuous price monitoring (24h intervals)...
echo Press Ctrl+C to stop
echo.
cd backend
node price-monitor.js
pause
