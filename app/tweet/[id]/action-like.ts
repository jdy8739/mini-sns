'use server';

import { revalidatePath } from 'next/cache';

import db from '@/db/db';

export const checkIsLiked = async ({
  userId,
  tweetId,
}: {
  userId: number;
  tweetId: number;
}) => {
  try {
    const isLiked = await db.like.findFirst({
      where: {
        userId,
        tweetId,
      },
      select: {
        id: true,
      },
    });

    return Boolean(isLiked);
  } catch (e) {
    return false;
  }
};

export const getNumberOfLikes = async (tweetId: number) => {
  try {
    const count = await db.like.count({ where: { tweetId } });

    return count;
  } catch (e) {
    return 0;
  }
};

const likeTweet = async ({
  userId,
  tweetId,
}: {
  userId: number;
  tweetId: number;
}) => {
  try {
    const id = await db.like.create({
      data: { userId, tweetId },
      select: { id: true },
    });

    return Boolean(id);
  } catch (e) {
    return null;
  }
};

const unlikeTweet = async ({
  userId,
  tweetId,
}: {
  userId: number;
  tweetId: number;
}) => {
  try {
    await db.like.deleteMany({ where: { userId, tweetId } });

    return true;
  } catch (e) {
    return null;
  }
};

export const toggleLike = async ({
  userId,
  tweetId,
  isLiked,
}: {
  userId: number;
  tweetId: number;
  isLiked: boolean;
}) => {
  if (isLiked) {
    await unlikeTweet({ userId, tweetId });
  } else {
    await likeTweet({ userId, tweetId });
  }

  revalidatePath(`/tweet/${tweetId}`);
};
