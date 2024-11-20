'use client';

import { useCallback, useState } from 'react';
import { Tweet } from '@prisma/client';
import Pagination from '@/components/pagination';

import TweetList from '@/components/tweet-list';
import { getCachedTweets } from './action';

const Home = () => {
  const [tweets, setTweets] = useState<Tweet[] | null>(null);

  const [totalCount, setTotalCount] = useState(0);

  const handleOnPageChange = useCallback(async (page: number, size: number) => {
    const [tweetsByPage, totalCount] = await getCachedTweets({
      page,
      size,
    });

    setTotalCount(totalCount);
    setTweets(tweetsByPage);
  }, []);

  return (
    <main>
      <div>
        <TweetList tweets={tweets} />
        <Pagination totalCount={totalCount} onPageChange={handleOnPageChange} />
      </div>
    </main>
  );
};

export default Home;
