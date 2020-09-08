const http = require('http');
const os = require('os');

const chalk = require('chalk');
chalk.level = 3;

const server = http.createServer((request, response) => {
  const hostname = os.hostname();
  console.log(`Incoming request from "${chalk.yellow(request.connection.remoteAddress)}" to "${chalk.yellow(`${request.method}:${request.url}`)}"`);
  response.writeHead(200, { 'content-type': 'text/html' });
  response.write(`
    <html>
      <head>
        <title>Hello World</title>
      </head>

      <body>
        Hello from <strong>${hostname}</strong> at <strong>${new Date()}</strong>.
      </body>
    </html>
  `);
  response.end();
});

server.on('listening', () => {
  console.log(`Server listening on port ${chalk.green(server.address().port)}`);
});

server.listen(process.env.WEB_PORT || 8000);

