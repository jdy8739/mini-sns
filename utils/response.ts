'use server';

import db from '@/db/db';

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

export const deleteResponse = async (id: number) => {
  try {
    await db.response.delete({ where: { id } });

    return true;
  } catch (e) {
    return null;
  }
};
