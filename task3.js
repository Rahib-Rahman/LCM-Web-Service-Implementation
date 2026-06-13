const http = require('http');
const url = require('url');

// Function to calculate GCD (Greatest Common Divisor)
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to calculate LCM (Lowest Common Multiple)
function lcm(x, y) {
    return (x * y) / gcd(x, y);
}

// Function to check if a number is a natural number
function isNaturalNumber(num) {
    return Number.isInteger(num) && num > 0;
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
        const x = parseInt(query.x, 10);
        const y = parseInt(query.y, 10);

        // Validate that both x and y are natural numbers
        if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
            res.writeHead(200);
            res.end('NaN');
            return;
        }

        // Calculate and return the LCM
        const result = lcm(x, y);
        res.writeHead(200);
        res.end(Math.floor(result).toString());
    } else {
        // Return 404 for any other path
        res.writeHead(404);
        res.end('Not Found');
    }
});

// Start the server on port 3000 http://localhost:${PORT}
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`LCM Service running at http://localhost:3000/app/rrahib778_gmail_com?x={}&y={}`);
});
