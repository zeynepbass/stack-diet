import pino from 'pino';
import env from '../config/env.js';

export default pino({ level: env.NODE_ENV === 'test' ? 'silent' : 'info' });
