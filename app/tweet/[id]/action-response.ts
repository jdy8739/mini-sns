'use server';

import { notFound } from 'next/navigation';
import { z } from 'zod';

import db from '@/db/db';
import { getSession } from '@/utils/session';
import { extractValuesFromFormData, parseErrors, wait } from '@/utils/utils';

// TODO: cache responses
export const getResponseByTweetId = async (tweetId: number) => {
  try {
    const responses = await db.response.findMany({ where: { tweetId } });

    return responses;
  } catch (e) {
    return [];
  }
};

export const createResponse = async ({
  userId,
  tweetId,
  content,
}: {
  userId: number;
  tweetId: number;
  content: string;
}) => {
  try {
    const { id } = await db.response.create({
      data: { userId, tweetId, content },
      select: { id: true },
    });

    return id;
  } catch (e) {
    return null;
  }
};

export const deleteResponse = async ({ id }: { id: number }) => {
  try {
    await db.response.delete({ where: { id } });

    return true;
  } catch (e) {
    return null;
  }
};

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
