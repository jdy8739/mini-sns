'use client';

import { useCallback, useState } from 'react';
import { Tweet } from '@prisma/client';
import Pagination from '@/components/pagination';
import { getTweetsByPagination } from './action';
import TweetList from '@/components/tweet-list';

const Home = () => {
  const [tweets, setTweets] = useState<Tweet[] | null>(null);

  const [totalCount, setTotalCount] = useState(0);

  const handleOnPageChange = useCallback(async (page: number, size: number) => {
    const [tweetsByPage, totalCount] = await getTweetsByPagination({
      page,
      size,
    });

    setTotalCount(totalCount);
    setTweets(tweetsByPage);
  }, []);

  return (
    <div>
      <TweetList tweets={tweets} />
      <Pagination totalCount={totalCount} onPageChange={handleOnPageChange} />
    </div>
  );
};

export default Home;
