@echo off
echo ==========================================
echo   PCSensei - Starting Backend Services
echo ==========================================
echo.
echo Installing dependencies...
cd backend
call npm install
echo.
echo Starting API server on port 3001...
node api-server.js
pause
