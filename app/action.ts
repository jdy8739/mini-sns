'use server';

import { Tweet } from '@prisma/client';

import cache from '@/cache/cache';
import { findTweetById, findTweetsByPagination } from '@/utils/tweets';

/** find all tweets by pagination */
export const getTweetsByPagination = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<[Tweet[] | null, number]> => {
  const [tweets, totalCount] = await findTweetsByPagination({
    skip: (page - 1) * size,
    take: size,
  });

  return [tweets, totalCount];
};

/** return cached all tweets */
export const getCachedTweets = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const cacheTweets = cache(getTweetsByPagination, [
    'tweets',
    `${page}-${size}`,
  ]);

  return cacheTweets({ page, size });
};

/** find tweet by id */
export const getTweetById = async (id: number) => {
  const tweet = await findTweetById(id);

  return tweet;
};

/** return cached tweet by id */
export const getCachedTweetById = async (id: number) => {
  const cacheTweetsById = cache(getTweetById, ['tweet', `${id}`]);

  return cacheTweetsById(id);
};
