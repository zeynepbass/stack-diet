import app from './app.js';
import connectDb from './config/db.js';
import env from './config/env.js';
import logger from './lib/logger.js';

try {
  await connectDb();
} catch (err) {
  logger.fatal({ err }, 'Could not connect to MongoDB');
  process.exit(1);
}

app.listen(env.PORT, () => {
  logger.info(`Server listening on port ${env.PORT}`);
});
