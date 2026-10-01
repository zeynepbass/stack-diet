import mongoose from 'mongoose';
import env from './env.js';

const connectDb = () => mongoose.connect(env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });

export default connectDb;
