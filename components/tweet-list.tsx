/* eslint-disable react/jsx-no-useless-fragment */

import { Tweet } from '@prisma/client';
import Link from 'next/link';

const TweetList = ({ tweets }: { tweets: Tweet[] | null }) => {
  return (
    <section>
      {tweets ? (
        tweets.map((tweet) => {
          return (
            <div key={tweet.id}>
              <Link href={`/tweet/${tweet.id}`}>{tweet.tweet}</Link>
            </div>
          );
        })
      ) : (
        <div>loading</div>
      )}
    </section>
  );
};

export default TweetList;
