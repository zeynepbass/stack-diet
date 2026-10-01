import { ZodError } from 'zod';
import logger from '../lib/logger.js';
import HttpError from '../utils/HttpError.js';

export const notFound = (req, res, next) => next(new HttpError(404, 'Kaynak bulunamadı'));

export const errorHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return res.status(400).json({ message: errors[0].message, errors });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'Bu e-posta adresi zaten kayıtlı' });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Gönderilen veri çok büyük' });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'İstek gövdesi okunamadı' });
  }

  logger.error({ err, method: req.method, url: req.originalUrl }, 'Unhandled error');
  res.status(500).json({ message: 'Sunucu hatası' });
};
