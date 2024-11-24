'use client';

import { useFormState, useFormStatus } from 'react-dom';

import { handleOnSubmit, TweetFormResult } from './action';

import Button from '@/components/button';
import Input from '@/components/Input';

const AddTweet = ({ isTried, errors }: TweetFormResult) => {
  const { pending } = useFormStatus();

  const isNormal = !isTried || pending;

  const isCertified = Object.keys(errors).length === 0;

  const showError = isTried && !pending;
  return (
    <div className="min-h-screen w-full bg-blue-50">
      <div className="max-w-md mx-auto px-4 py-8 flex flex-col justify-center items-center min-h-screen">
        <div className="w-full bg-white rounded-lg shadow-sm p-6 space-y-4">
          <h1 className="text-2xl font-semibold text-blue-900 text-center mb-4">
            Create Tweet
          </h1>
          <Input
            placeholder="What's happening?"
            name="tweet"
            required
            showError={showError}
            isNormal={isNormal}
            errors={errors.tweet}
          />
          <Button
            pending={pending}
            isTried={isTried}
            isNormal={isNormal}
            isCertified={isCertified}
          />
        </div>
      </div>
    </div>
  );
};

const TweetPage = () => {
  const [state, formAction] = useFormState<TweetFormResult>(
    handleOnSubmit as unknown as (state: TweetFormResult) => TweetFormResult,
    {
      tweet: '',
      isTried: false,
      errors: {},
    },
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <form
        className="w-full h-full flex flex-col items-center justify-center"
        action={formAction}
      >
        <AddTweet {...state} />
      </form>
    </main>
  );
};

export default TweetPage;
