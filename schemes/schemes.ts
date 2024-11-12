/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

const formScheme = z.object({
  email: z.string().email().includes('@zod.com'),
  username: z.string().min(5),
  password: z
    .string()
    .min(10)
    .regex(/.*[0-9].*/, '숫자를 최소 1개 이상 포함해야 합니다'),
});

export { formScheme };
