import { notFound } from 'next/navigation';
import { getTweetById } from '@/app/action';
import { formatToTimeAgo } from '@/utils/date';

const TweetPage = async ({ params: { id } }: { params: { id: string } }) => {
  const tweetId = Number(id);

  if (Number.isNaN(tweetId)) {
    notFound();
  }

  const tweet = await getTweetById(tweetId);

  if (!tweet) {
    notFound();
  }

  return (
    <div>
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
    </div>
  );
};

export default TweetPage;
