import * as http from 'http';

import { app } from './app';
import { config } from './config';

const server = http.createServer(app);

server.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started and listened on ${config.PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on('uncaughtException', (error) => {
  // eslint-disable-next-line no-console
  console.log(error);
});

process.on('unhandledRejection', (error) => {
  // eslint-disable-next-line no-console
  console.log(error);
});
