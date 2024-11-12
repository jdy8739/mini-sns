/* eslint-disable no-param-reassign */
import { z } from 'zod';

export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const parseErrors = <T extends object>(
  errorList: z.ZodIssue[] | undefined,
): T => {
  const errors = errorList?.reduce<T>(
    (a, b) => {
      const key = b.path[0] as keyof T;

      if (key in a) {
        const value = (
          a[key] ? [...(a[key] as string[]), b.message] : [b.message]
        ) as T[keyof T];

        a[key] = value;
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
