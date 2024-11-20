'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { formScheme } from '@/schemes/schemes';
import { login } from '@/utils/auth';
import { updateSession } from '@/utils/session';
import { extractValuesFromFormData, parseErrors, wait } from '@/utils/utils';

type FormType = z.infer<typeof formScheme>;

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

  const parseResult = formScheme.safeParse(values);

  /** parsed error list */
  const errors = parseErrors<Errors>(parseResult.error?.errors);

  if (parseResult.success) {
    const id = await login(values.email, values.password);

    if (id) {
      await updateSession(id);

      redirect('/profile');
    }
    errors.email = ['The id or password is wrong!!'];
  }

  return {
    ...values,
    isTried: true,
    errors: errors ?? {},
  };
};

export { handleOnSubmit };
export type { FormResult };
