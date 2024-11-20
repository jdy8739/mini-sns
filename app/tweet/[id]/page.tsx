import { notFound } from 'next/navigation';

import { getCachedTweetById } from '@/app/action';
import LikeButton from '@/components/like-button';
import Response from '@/components/response';
import { formatToTimeAgo } from '@/utils/date';
import { checkIsLiked, getNumberOfLikes } from '@/utils/like';
import { getResponseByTweetId } from '@/utils/response';
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

  const numberOfLikes = await getNumberOfLikes(tweetId);

  const isLiked = await checkIsLiked({ userId, tweetId });

  const responses = await getResponseByTweetId(tweetId);

  return (
    <main>
      <section>
        <div>
          <span>{tweet.userId}</span>
        </div>
        <p>{tweet.tweet}</p>
        <div>
          <span>{formatToTimeAgo(new Date(tweet.createdAt).getTime())}</span>
        </div>
        <div>
          <span>{tweet.user.email}</span>
        </div>
        <div>
          <span>{`${numberOfLikes} likes`}</span>
          <div>
            <LikeButton userId={userId} tweetId={tweetId} isLiked={isLiked} />
          </div>
        </div>
      </section>
      <section>
        <Response tweetId={tweetId} userId={userId} responses={responses} />
      </section>
    </main>
  );
};

export default TweetPage;
