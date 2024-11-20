'use client';

import { useCallback, useState } from 'react';

import { toggleLike } from '@/app/tweet/[id]/action';

const LikeButton = ({
  userId,
  tweetId,
  isLiked,
}: {
  userId: number;
  tweetId: number;
  isLiked: boolean;
}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const handleOnLike = useCallback(async () => {
    await toggleLike({ userId, tweetId, isLiked });

    setIsLikedState((prev) => !prev);
  }, [userId, tweetId, isLiked]);

  return (
    <button type="button" onClick={handleOnLike}>
      {isLikedState ? 'unlike' : 'like'}
    </button>
  );
};

export default LikeButton;
