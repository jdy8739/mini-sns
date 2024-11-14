import { notFound } from 'next/navigation';
import { getTweetById } from '@/app/action';

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
      tweet {tweet.tweet} {tweet.userId}
    </div>
  );
};

export default TweetPage;
