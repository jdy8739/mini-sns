'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { extractValuesFromFormData, parseErrors, wait } from '@/utils/utils';
import { formScheme } from '@/schemes/schemes';
import { checkDuplicateEmail, createUser } from '@/utils/auth';

const createAccountScheme = formScheme
  .extend({ passwordConfirm: z.string() })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: 'The password and password confirm must be same!',
    path: ['passwordConfirm'],
  })
  .refine(
    async ({ email }) => {
      const isDuplicate = await checkDuplicateEmail(email);
      return !isDuplicate;
    },
    {
      message: 'Duplicate Email!',
      path: ['email'],
    },
  );

type CreateAccountType = z.infer<typeof createAccountScheme>;

type Errors = Partial<Record<keyof CreateAccountType, string[]>>;

type CreateAccountResult = CreateAccountType & {
  isTried: boolean;
  errors: Errors;
};

const handleOnSubmit = async (_: CreateAccountResult, current: FormData) => {
  await wait(1000);

  const values = extractValuesFromFormData(current, [
    'email',
    'username',
    'password',
    'passwordConfirm',
  ] as const);

  const parseResult = await createAccountScheme.safeParseAsync(values);

  /** parsed error list */
  const errors = parseErrors<Errors>(parseResult.error?.errors);

  if (Object.keys(errors).length === 0) {
    const id = await createUser(values);

    if (id) {
      redirect('/log-in');
    }
  }

  return {
    ...values,
    isTried: true,
    errors: errors ?? {},
  };
};

export { handleOnSubmit };
export type { CreateAccountResult };
