'use client';

import { Tweet } from '@prisma/client';
import Link from 'next/link';
import { Suspense, useCallback, useState } from 'react';

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
    <main
      className={`min-h-screen bg-gray-50 flex items-center ${tweets && tweets!.length > 10 && 'py-40'}`}
    >
      <div className="min-w-[320px] max-w-4xl w-full mx-auto py-8 px-4 flex flex-col items-center">
        <TweetList tweets={tweets} />
        <div className="mt-8">
          <Suspense fallback={<div>loading...</div>}>
            <Pagination
              totalCount={totalCount}
              onPageChange={handleOnPageChange}
            />
          </Suspense>
        </div>
        <div className="mt-8">
          <Link
            href="/tweet"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 px-4 py-2 rounded-md hover:bg-blue-50"
          >
            Go write a tweet
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
