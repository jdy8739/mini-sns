'use server';

import { Tweet } from '@prisma/client';
import { findTweetById, findTweetsByPagination } from '@/utils/tweets';
import cache from '@/cache/cache';

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

export const getCachedTweets = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const cacheFunction = cache(getTweetsByPagination, [
    'tweets',
    `${page}-${size}`,
  ]);

  return cacheFunction({ page, size });
};

export const getTweetById = async (id: number) => {
  const tweet = await findTweetById(id);

  return tweet;
};
