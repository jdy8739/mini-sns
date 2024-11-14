'use client';

import { useCallback, useState } from 'react';
import { Tweet } from '@prisma/client';
import Pagination from '@/components/pagination';
import { getTweetsByPagination } from './action';

const Home = () => {
  const [tweets, setTweets] = useState<Tweet[] | null>(null);

  const handleOnPageChange = useCallback(async (page: number, size: number) => {
    const [tweetsByPage, totalCount] = await getTweetsByPagination({
      page,
      size,
    });

    if (tweetsByPage) {
      setTweets(tweetsByPage);
    }
  }, []);

  return (
    <div>
      {tweets ? (
        tweets.map((tweet) => {
          return <div key={tweet.id}>{tweet.tweet}</div>;
        })
      ) : (
        <div>loading</div>
      )}
      <Pagination totalCount={10} onPageChange={handleOnPageChange} />
    </div>
  );
};

export default Home;
