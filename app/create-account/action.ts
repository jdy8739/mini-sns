'use server';

import { z } from 'zod';
import { parseErrors, wait } from '@/utils/utils';

const createAccountScheme = z
  .object({
    email: z.string().email().includes('@zod.com'),
    username: z.string().min(5),
    password: z
      .string()
      .min(10)
      .regex(/.*[0-9].*/, '숫자를 최소 1개 이상 포함해야 합니다'),
    passwordConfirm: z.string(),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: 'The password and password confirm must be same!',
    path: ['passwordConfirm'],
  });

type CreateAccountType = z.infer<typeof createAccountScheme>;

type Errors = Partial<Record<keyof CreateAccountType, string[]>>;

type CreateAccountResult = CreateAccountType & {
  isTried: boolean;
  errors: Errors;
};

const handleOnSubmit = async (_: CreateAccountResult, current: FormData) => {
  await wait(1000);

  const email = current.get('email');

  const username = current.get('username');

  const password = current.get('password');

  const passwordConfirm = current.get('passwordConfirm');

  const parseResult = createAccountScheme.safeParse({
    email,
    username,
    password,
    passwordConfirm,
  });

  /** parsed error list */
  const errors = parseErrors<Errors>(parseResult.error?.errors);

  return {
    email,
    username,
    password,
    passwordConfirm,
    isTried: true,
    errors: errors ?? {},
  };
};

export { handleOnSubmit };
export type { CreateAccountResult };
