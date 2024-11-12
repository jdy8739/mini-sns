/* eslint-disable no-param-reassign */

'use server';

import { z } from 'zod';
import { parseErrors, wait } from '@/utils/utils';

const formScheme = z.object({
  email: z.string().email().includes('@zod.com'),
  username: z.string().min(5),
  password: z
    .string()
    .min(10)
    .regex(/.*[0-9].*/, '숫자를 최소 1개 이상 포함해야 합니다'),
});

type FormType = z.infer<typeof formScheme>;

type Errors = Partial<Record<keyof FormType, string[]>>;

type FormResult = FormType & {
  isTried: boolean;
  errors: Errors;
};

const handleOnSubmit = async (_: FormResult, current: FormData) => {
  await wait(1000);

  const email = current.get('email');

  const username = current.get('username');

  const password = current.get('password');

  const parseResult = formScheme.safeParse({ email, username, password });

  /** parsed error list */
  const errors = parseErrors<Errors>(parseResult.error?.errors);

  return {
    email,
    username,
    password,
    isTried: true,
    errors: errors ?? {},
  };
};

export default handleOnSubmit;
export type { FormResult };
