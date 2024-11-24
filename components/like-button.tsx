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
    <button
      type="button"
      onClick={handleOnLike}
      className={`px-4 py-2 rounded-lg transition-colors ${
        optimisticIsLiked
          ? 'bg-red-500 text-white hover:bg-red-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {optimisticIsLiked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButton;
