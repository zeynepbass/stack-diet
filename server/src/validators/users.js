import { z } from 'zod';
import { name } from './common.js';

const MAX_AVATAR_LENGTH = 1_400_000;

const signatures = { png: 'iVBORw0KGgo', jpeg: '/9j/', webp: 'UklGR' };

const isSupportedImage = (value) => {
  const match = value.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+=*)$/);
  return Boolean(match) && match[2].startsWith(signatures[match[1]]);
};

export const updateUserBody = z
  .object({
    firstName: name('İsim'),
    lastName: name('Soyisim'),
    avatar: z
      .string()
      .max(MAX_AVATAR_LENGTH, "Görsel 1 MB'tan büyük olamaz")
      .refine(isSupportedImage, 'Yalnızca PNG, JPEG veya WebP görsel yükleyebilirsiniz'),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, 'Güncellenecek bir alan gönderin');
