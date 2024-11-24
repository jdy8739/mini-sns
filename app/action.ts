'use server';

import { Tweet } from '@prisma/client';
import { revalidateTag } from 'next/cache';

import cache from '@/cache/cache';
import { getNumberOfLikes } from '@/utils/like';
import { deleteResponse, getResponseByTweetId } from '@/utils/response';
import {
  deleteTweet,
  findTweetById,
  findTweetsByPagination,
} from '@/utils/tweets';

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
  const cacheTweets = cache(
    getTweetsByPagination,
    ['tweets', `${page}-${size}`],
    { tags: ['tweets'] },
  );

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

/** return cached number of likes */
export const getCachedNumberOfLikes = async (tweetId: number) => {
  const cacheNumberOfLikes = cache(
    getNumberOfLikes,
    ['tweet-likes', `${tweetId}`],
    { tags: [`tweet-likes-${tweetId}`] },
  );

  return cacheNumberOfLikes(tweetId);
};

/** return cached response by tweet id */
export const getCachedResponseByTweetId = async (tweetId: number) => {
  const cacheResponseByTweetId = cache(
    getResponseByTweetId,
    ['tweet-responses', `${tweetId}`],
    { tags: [`tweet-responses-${tweetId}`] },
  );

  return cacheResponseByTweetId(tweetId);
};

export const revalidateTweetsAfterDelete = async (tweetId: number) => {
  const deleted = await deleteTweet(tweetId);

  if (deleted) {
    revalidateTag('tweets');
  }
};

export const revalidateResponsesAfterDelete = async ({
  tweetId,
  responseId,
}: {
  tweetId: number;
  responseId: number;
}) => {
  const deleted = await deleteResponse(responseId);

  if (deleted) {
    revalidateTag(`tweet-responses-${tweetId}`);
  }
};
