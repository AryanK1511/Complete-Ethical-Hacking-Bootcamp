const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <html>
      <head>
        <title>Basic Node Server</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
          }
          h1 { color: #333; }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello from Node.js!</h1>
          <p>This is a basic Node.js server running on port 80.</p>
          <p>Server time: ${new Date().toLocaleString()}</p>
          <p>Request URL: ${req.url}</p>
        </div>
      </body>
    </html>
  `);
});

server.listen(80, () => {
  console.log("Server is running on http://localhost:80");
});
