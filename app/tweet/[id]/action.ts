'use server';

import { notFound } from 'next/navigation';
import { z } from 'zod';

import { createResponse } from '@/utils/response';
import { getSession } from '@/utils/session';
import { wait, extractValuesFromFormData, parseErrors } from '@/utils/utils';

const responseScheme = z.object({
  id: z.number().nullable().optional(),
  tweetId: z.coerce.number(),
  content: z.string().min(1),
});

type ResponseType = z.infer<typeof responseScheme>;

type Errors = Partial<Record<keyof ResponseType, string[]>>;

type ResponseFormResult = ResponseType & {
  errors: Errors;
};

const handleOnSubmit = async (_: ResponseFormResult, current: FormData) => {
  await wait(1000);

  const values = extractValuesFromFormData(current, [
    'id',
    'content',
    'tweetId',
  ] as const);

  const parseResult = responseScheme.safeParse(values);

  /** parsed error list */
  const errors = parseErrors<Errors>(parseResult.error?.errors);

  if (parseResult.success) {
    const userId = (await getSession()).id;

    if (userId) {
      const responseId = await createResponse({
        userId,
        tweetId: Number(values.tweetId),
        content: values.content,
      });

      if (responseId) {
        values.id = String(responseId);
      } else {
        errors.content = ['Failed to create response'];
      }

      // revalidateTag('tweets');
    } else {
      notFound();
    }
  }

  return {
    ...values,
    errors: errors ?? {},
  };
};

export { handleOnSubmit };
export type { ResponseFormResult };
