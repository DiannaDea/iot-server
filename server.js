const http = require('http');
const config = require('config');

const app = require('./app');

const port = config.app.port;

http.createServer(app.callback()).listen(port);

console.log(`Server running on port ${port}`);
