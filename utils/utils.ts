/* eslint-disable no-param-reassign */
import { z } from 'zod';

/** wait for ms */
export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/** extract formdata values from FormData objects by list of keys */
export const extractValuesFromFormData = <T extends readonly string[]>(
  formData: FormData,
  keys: T,
) =>
  keys.reduce(
    (a, b) => ({ ...a, [b]: formData.get(b) }),
    {} as Record<T[number], string>,
  );

/** parse zod error from zod issue list */
export const parseErrors = <T extends object>(
  errorList: z.ZodIssue[] | undefined,
): T => {
  const errors = errorList?.reduce<T>(
    (a, b) => {
      const key = b.path[0] as keyof T;

      if (key in a) {
        const errorList = (
          a[key] ? [...(a[key] as string[]), b.message] : [b.message]
        ) as T[keyof T];

        a[key] = errorList;
      } else {
        a[key] = [b.message] as T[keyof T];
      }

      return a;
    },
    {} as unknown as T,
  );

  if (!errors) {
    return {} as T;
  }

  return errors;
};
