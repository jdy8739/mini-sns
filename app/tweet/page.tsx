'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleOnSubmit, TweetFormResult } from './action';
import Input from '@/components/Input';
import Button from '@/components/button';

const AddTweet = ({ isTried, errors }: TweetFormResult) => {
  const { pending } = useFormStatus();

  const isNormal = !isTried || pending;

  const isCertified = Object.keys(errors).length === 0;

  const showError = isTried && !pending;
  return (
    <div className="h-lvh w-full flex justify-center">
      <div className="flex flex-col justify-center items-center gap-3 h-full w-80 focus-within::outline-none text-slate-400">
        <Input
          placeholder="tweet"
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
    <main>
      <form className="flex flex-col" action={formAction}>
        <AddTweet {...state} />
      </form>
    </main>
  );
};

export default TweetPage;
