import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import env from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const app = express();

if (env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL }));
app.use('/api/users', express.json({ limit: '2mb' }));
app.use(express.json({ limit: '100kb' }));

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
