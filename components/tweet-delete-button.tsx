'use client';

import { useRouter } from 'next/navigation';

import { revalidateTweetsAfterDelete } from '@/app/action';

const TweetDeleteButton = ({ tweetId }: { tweetId: number }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
      onClick={() => {
        revalidateTweetsAfterDelete(tweetId);
        router.replace('/');
      }}
    >
      delete tweet
    </button>
  );
};

export default TweetDeleteButton;
