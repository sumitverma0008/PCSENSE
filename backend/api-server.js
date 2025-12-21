const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Trigger price check endpoint
    if (req.url === '/api/run-price-check' && req.method === 'POST') {
        console.log('📊 Price check triggered from admin panel...');
        
        // Run the price monitor script
        const priceCheck = spawn('node', ['price-monitor.js', '--once'], {
            cwd: __dirname
        });

        let output = '';
        let errorOutput = '';

        priceCheck.stdout.on('data', (data) => {
            output += data.toString();
            console.log(data.toString());
        });

        priceCheck.stderr.on('data', (data) => {
            errorOutput += data.toString();
            console.error(data.toString());
        });

        priceCheck.on('close', (code) => {
            if (code === 0) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Price check completed successfully',
                    output: output
                }));
            } else {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    message: 'Price check failed',
                    error: errorOutput
                }));
            }
        });

        return;
    }

    // Health check endpoint
    if (req.url === '/api/health' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', message: 'API server running' }));
        return;
    }

    // Get last price update time
    if (req.url === '/api/last-update' && req.method === 'GET') {
        const summaryPath = path.join(__dirname, 'logs', 'price-summary.txt');
        
        if (fs.existsSync(summaryPath)) {
            const content = fs.readFileSync(summaryPath, 'utf8');
            const lines = content.split('\n');
            const generatedLine = lines.find(l => l.startsWith('Generated:'));
            
            if (generatedLine) {
                const timestamp = generatedLine.replace('Generated:', '').trim();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    timestamp: timestamp
                }));
                return;
            }
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            message: 'No price updates yet'
        }));
        return;
    }

    // 404 for other routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
    console.log(`📊 Price check endpoint: POST http://localhost:${PORT}/api/run-price-check`);
    console.log(`💚 Health check: GET http://localhost:${PORT}/api/health`);
});
