const http = require('http');
const url = require('url');

// Function to calculate GCD using BigInt
function gcd(a, b) {
    a = BigInt(a);
    b = BigInt(b);
    while (b !== 0n) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to calculate LCM using BigInt
function lcm(x, y) {
    x = BigInt(x);
    y = BigInt(y);
    return (x * y) / gcd(x, y);
}

// Function to check if a value is a natural number
function isNaturalNumber(value) {
    // Check if it's a valid positive integer string
    if (typeof value !== 'string') return false;
    if (value === '' || value === '0') return false;
    if (!/^[0-9]+$/.test(value)) return false;
    const num = BigInt(value);
    return num > 0n;
}

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Set response headers
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    // Parse the URL and query parameters
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Check if the request is for the LCM endpoint
    if (pathname === '/lcm/rrahib778_gmail_com') {
        // Get x and y from query parameters
        const xStr = query.x;
        const yStr = query.y;

        // Validate that both x and y are natural numbers
        if (!isNaturalNumber(xStr) || !isNaturalNumber(yStr)) {
            res.writeHead(200);
            res.end('NaN');
            return;
        }

        // Calculate and return the LCM
        const result = lcm(xStr, yStr);
        res.writeHead(200);
        res.end(result.toString());
    } else {
        // Return 404 for any other path
        res.writeHead(404);
        res.end('Not Found');
    }
});

// Start the server on port 3000 http://localhost:${PORT}
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`LCM Service running at http://localhost:${PORT}/app/rrahib778_gmail_com?x={}&y={}`);
});
