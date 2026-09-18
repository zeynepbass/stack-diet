import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/login.js';
import post from './routes/post.js';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

app.use(cors());
app.use('/', userRoutes);
app.use('/', post);

app.listen(process.env.PORT, () => {
  connectDb();
});

