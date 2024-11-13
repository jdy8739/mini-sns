/* eslint-disable no-param-reassign */

'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { extractValuesFromFormData, parseErrors, wait } from '@/utils/utils';
import { formScheme } from '@/schemes/schemes';
import { login } from '@/utils/auth';

const loginScheme = formScheme.refine(
  async ({ email, password }) => {
    const doesUserExist = await login(email, password);

    return doesUserExist;
  },
  { message: 'The id or password is wrong!!', path: ['email'] },
);

type FormType = z.infer<typeof loginScheme>;

type Errors = Partial<Record<keyof FormType, string[]>>;

type FormResult = FormType & {
  isTried: boolean;
  errors: Errors;
};

const handleOnSubmit = async (_: FormResult, current: FormData) => {
  await wait(1000);

  const values = extractValuesFromFormData(current, [
    'email',
    'username',
    'password',
    'passwordConfirm',
  ] as const);

  const parseResult = await loginScheme.safeParseAsync(values);

  /** parsed error list */
  const errors = parseErrors<Errors>(parseResult.error?.errors);

  if (Object.keys(errors).length === 0) {
    redirect('/profile');
  }

  return {
    ...values,
    isTried: true,
    errors: errors ?? {},
  };
};

export { handleOnSubmit };
export type { FormResult };
