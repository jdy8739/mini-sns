'use client';

import { useCallback, useOptimistic } from 'react';

import { toggleLike } from '@/utils/like';

const LikeButton = ({
  userId,
  tweetId,
  isLiked,
}: {
  userId: number;
  tweetId: number;
  isLiked: boolean;
}) => {
  const [optimisticIsLiked, addOptimisticIsLiked] = useOptimistic(
    isLiked,
    (prev) => !prev,
  );

  const handleOnLike = useCallback(async () => {
    addOptimisticIsLiked(undefined);

    await toggleLike({ userId, tweetId, isLiked });
  }, [userId, tweetId, isLiked, addOptimisticIsLiked]);

  return (
    <button type="button" onClick={handleOnLike}>
      {optimisticIsLiked ? 'unlike' : 'like'}
    </button>
  );
};

export default LikeButton;
