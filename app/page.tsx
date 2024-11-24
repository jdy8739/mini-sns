'use client';

import { Tweet } from '@prisma/client';
import { useCallback, useState } from 'react';

import { getCachedTweets } from './action';

import Pagination from '@/components/pagination';
import TweetList from '@/components/tweet-list';

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
    <main className="min-h-screen bg-gray-50 flex items-center">
      <div className="min-w-[320px] max-w-4xl w-full mx-auto py-8 px-4 flex flex-col items-center">
        <TweetList tweets={tweets} />
        <div className="mt-8">
          <Pagination
            totalCount={totalCount}
            onPageChange={handleOnPageChange}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
