const http = require('http');
const os = require('os');

const chalk = require('chalk');
chalk.level = 3;

const server = http.createServer((request, response) => {
  if (request.url === '/quit/0') {
    console.log('User requested exit (code 0)');
    process.exit(0);
  }

  if (request.url === '/quit/1') {
    console.log('User requested exit (code 1)');
    process.exit(1);
  }

  const hostname = os.hostname();
  console.log(`Incoming request from "${chalk.yellow(request.connection.remoteAddress)}" to "${chalk.yellow(`${request.method}:${request.url}`)}"`);
  response.writeHead(200, { 'content-type': 'text/html' });
  response.write(`
    <html>
      <head>
        <title>Hello World</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>

      <body>
        <p>Hello from <strong>${hostname}</strong> at <strong>${new Date()}</strong>.</p>
        <p>
          <ul>
            <li><a href="/quit/0">Quit Node App (Code 0)</a></li>
            <li><a href="/quit/1">Quit Node App (Code 1)</a></li>
          </ul>
        </p>
      </body>
    </html>
  `);
  response.end();
});

server.on('listening', () => {
  console.log(`Server listening on port ${chalk.green(server.address().port)}`);
});

server.listen(process.env.WEB_PORT || 8000);
