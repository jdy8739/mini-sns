'use server';

import { z } from 'zod';
import { notFound, redirect } from 'next/navigation';
import { extractValuesFromFormData, parseErrors, wait } from '@/utils/utils';
import { getSession } from '@/utils/session';
import { saveTweet } from '@/utils/tweets';

const tweetScheme = z.object({
  tweet: z.string().min(1),
});

type TweetType = z.infer<typeof tweetScheme>;

type Errors = Partial<Record<keyof TweetType, string[]>>;

type TweetFormResult = TweetType & {
  isTried: boolean;
  errors: Errors;
};

const handleOnSubmit = async (_: TweetFormResult, current: FormData) => {
  await wait(1000);

  const values = extractValuesFromFormData(current, ['tweet'] as const);

  const parseResult = tweetScheme.safeParse(values);

  /** parsed error list */
  const errors = parseErrors<Errors>(parseResult.error?.errors);

  if (parseResult.success) {
    const userId = (await getSession()).id;

    if (userId) {
      const tweetId = await saveTweet(values.tweet, userId);

      redirect(`/tweet/${tweetId}`);
    } else {
      notFound();
    }
  }

  return {
    ...values,
    isTried: true,
    errors: errors ?? {},
  };
};

export { handleOnSubmit };
export type { TweetFormResult };
