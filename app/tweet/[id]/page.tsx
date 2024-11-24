import { notFound } from 'next/navigation';

import {
  getCachedNumberOfLikes,
  getCachedResponseByTweetId,
  getCachedTweetById,
} from '@/app/action';
import LikeButton from '@/components/like-button';
import Response from '@/components/response';
import { formatToTimeAgo } from '@/utils/date';
import { checkIsLiked } from '@/utils/like';
import { getSession } from '@/utils/session';

const TweetPage = async ({ params: { id } }: { params: { id: string } }) => {
  const tweetId = Number(id);

  if (Number.isNaN(tweetId)) {
    notFound();
  }

  const tweet = await getCachedTweetById(tweetId);

  if (!tweet) {
    notFound();
  }

  const userId = (await getSession()).id;

  const numberOfLikes = await getCachedNumberOfLikes(tweetId);

  const isLiked = await checkIsLiked({ userId, tweetId });

  const responses = await getCachedResponseByTweetId(tweetId);

  return (
    <main className="flex flex-col items-center w-full p-4">
      <section className="w-full max-w-2xl border rounded-lg p-6 bg-white shadow-sm">
        <div className="mb-2">
          <span className="text-gray-600">User ID: {tweet.userId}</span>
        </div>
        <p className="text-xl font-medium text-gray-900 mb-4">{tweet.tweet}</p>
        <div className="mb-2">
          <span className="text-sm text-gray-500">
            {formatToTimeAgo(new Date(tweet.createdAt).getTime())}
          </span>
        </div>
        <div className="mb-4">
          <span className="text-gray-600">{tweet.user.email}</span>
        </div>
        <div className="flex items-center gap-4 border-t pt-4">
          <span className="text-gray-600">{`${numberOfLikes} likes`}</span>
          <div>
            <LikeButton userId={userId} tweetId={tweetId} isLiked={isLiked} />
          </div>
        </div>
      </section>
      <section className="w-full max-w-2xl mt-6">
        <Response tweetId={tweetId} userId={userId} responses={responses} />
      </section>
    </main>
  );
};

export default TweetPage;
