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

  let message = '';
  if (request.url.startsWith('/memory/')) {
    const x = parseInt(request.url.substr('/memory/'.length));
    console.log(`User requested to use some memory (${x} times}`);
    const accumulation = [];

    for (let i = 0; i < x; i++) {
      accumulation.push('a');
    }
    message = `Added ${x} items to an array`;
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
        <div style="background-color: yellow;">${message}</div>
        <p>Hello from <strong>${hostname}</strong> at <strong>${new Date()}</strong>.</p>
        <p>
          <ul>
            <li><a href="/quit/0">Quit Node App (Code 0)</a></li>
            <li><a href="/quit/1">Quit Node App (Code 1)</a></li>
            <li><a href="/memory/1000">Increase memory (1000)</a></li>
            <li><a href="/memory/1000000">Increase memory (1000000)</a></li>
            <li><a href="/memory/10000000">Increase memory (10000000)</a></li>
            <li><a href="/memory/100000000">Increase memory (100000000)</a></li>
          </ul>
        </p>

        <script>
          window.history.pushState(null, null, '/');
        </script>
      </body>
    </html>
  `);
  response.end();
});

server.on('listening', () => {
  console.log(`Server listening on port ${chalk.green(server.address().port)}`);
});

server.listen(process.env.WEB_PORT || 8000);
