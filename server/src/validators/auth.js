import { z } from 'zod';
import { name } from './common.js';

const email = z.string().trim().toLowerCase().pipe(z.email('Geçerli bir e-posta adresi girin'));

const password = z
  .string()
  .min(8, 'Parola en az 8 karakter olmalı')
  .max(72, 'Parola en fazla 72 karakter olabilir');

const passwordsMatch = [
  (data) => data.password === data.confirmPassword,
  { path: ['confirmPassword'], message: 'Parolalar eşleşmiyor' },
];

export const registerBody = z
  .object({
    firstName: name('İsim'),
    lastName: name('Soyisim'),
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine(...passwordsMatch);

export const loginBody = z.object({
  email,
  password: z.string().min(1, 'Parola zorunlu'),
});

export const forgotPasswordBody = z.object({ email });

export const resetPasswordBody = z
  .object({
    token: z.string().min(1, 'Sıfırlama bağlantısı geçersiz'),
    password,
    confirmPassword: z.string(),
  })
  .refine(...passwordsMatch);
