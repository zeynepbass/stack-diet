import { z } from 'zod';

export const postBody = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Başlık zorunlu')
    .max(150, 'Başlık en fazla 150 karakter olabilir'),
  content: z
    .string()
    .trim()
    .min(1, 'Açıklama zorunlu')
    .max(2000, 'Açıklama en fazla 2000 karakter olabilir'),
});

export const commentBody = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Yorum boş olamaz')
    .max(500, 'Yorum en fazla 500 karakter olabilir'),
});
