/* eslint-disable no-param-reassign */

'use server';

import { z } from 'zod';
import { extractValuesFromFormData, parseErrors, wait } from '@/utils/utils';
import { formScheme } from '@/schemes/schemes';

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
  ]);

  const parseResult = formScheme.safeParse(values);

  /** parsed error list */
  const errors = parseErrors<Errors>(parseResult.error?.errors);

  return {
    ...values,
    isTried: true,
    errors: errors ?? {},
  };
};

export { handleOnSubmit };
export type { FormResult };
