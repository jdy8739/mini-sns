import { Tweet } from '@prisma/client';
import db from '@/db/db';

export const findTweetsByPagination = async (pagination?: {
  skip?: number;
  take?: number;
}): Promise<[Tweet[] | null, number]> => {
  const { skip = 0, take = 5 } = pagination || {};

  try {
    const [tweets, totalCount] = await db.$transaction([
      db.tweet.findMany({ skip, take }),
      db.tweet.count(),
    ]);

    return [tweets, totalCount];
  } catch (e) {
    return [null, 0];
  }
};

export const findTweetById = async (id: number) => {
  try {
    const tweet = await db.tweet.findUnique({ where: { id } });

    return tweet;
  } catch (e) {
    return null;
  }
};
