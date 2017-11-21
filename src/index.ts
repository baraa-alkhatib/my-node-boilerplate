import * as debug from 'debug';
import * as http from 'http';

import app from './app';

// configure debug
debug('ts-express:server');

// store the port into a const port
const port = normalizePort(process.env.PORT || 3896);
// set the app port
app.set('port', port);
// create hte server instance
const server = http.createServer(app);

// start the server and listen for events
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);
/**
 * Configure the port based on the environment
 * @param {(string | number)} val 
 * @returns {(string | number | boolean)} 
 */
function normalizePort(val: string | number): string | number | boolean {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}
/**
 * log the error thrown when trying to conncet to the server
 * @param {NodeJS.ErrnoException} err 
 */
function onError(err: NodeJS.ErrnoException): void {
  if (err.syscall !== 'listen') throw err;
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (err.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
}

/**
 *  log a message if app is listening to the specified port on the server
 */
function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr}`;
  debug(`Listening on ${bind}`);
}
