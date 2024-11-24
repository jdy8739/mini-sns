/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */

import { Tweet } from '@prisma/client';
import Link from 'next/link';

const TweetList = ({ tweets }: { tweets: Tweet[] | null }) => {
  return (
    <section className="flex flex-col items-center w-full p-4">
      {tweets ? (
        tweets.length ? (
          tweets.map((tweet) => {
            return (
              <div
                key={tweet.id}
                className="w-full max-w-2xl border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors"
              >
                <Link
                  href={`/tweet/${tweet.id}`}
                  className="block text-lg text-gray-800 hover:text-blue-600"
                >
                  {tweet.tweet}
                </Link>
              </div>
            );
          })
        ) : (
          <div>No Contents</div>
        )
      ) : (
        <div className="text-gray-500 text-center py-8">loading...</div>
      )}
    </section>
  );
};

export default TweetList;
