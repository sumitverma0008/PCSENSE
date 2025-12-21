@echo off
echo ==========================================
echo   PCSensei - Starting Frontend Server
echo ==========================================
echo.
echo Starting Python HTTP server on port 8000...
echo.
cd frontend
python -m http.server 8000
pause
