import { z } from 'zod';

export const idParams = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Geçersiz id'),
});

export const name = (label) =>
  z.string().trim().min(1, `${label} zorunlu`).max(50, `${label} en fazla 50 karakter olabilir`);
