'use client';

import { useFormState } from 'react-dom';

import {
  handleOnSubmit,
  ResponseFormResult,
} from '@/app/tweet/[id]/action-response';

const Submit = ({ tweetId }: { tweetId: number }) => {
  return (
    <>
      <input
        type="text"
        name="tweetId"
        readOnly
        className="hidden"
        value={tweetId}
      />
      <input type="text" name="content" />
      <button type="submit">response</button>
    </>
  );
};

const Response = ({ tweetId }: { tweetId: number }) => {
  const [state, formAction] = useFormState<ResponseFormResult>(
    handleOnSubmit as unknown as (
      state: ResponseFormResult,
    ) => ResponseFormResult,
    {
      tweetId,
      content: '',
      errors: {},
    },
  );

  return (
    <div>
      <div>{state.errors.content?.[0] || state.content}</div>
      <form action={formAction}>
        <Submit tweetId={tweetId} />
      </form>
    </div>
  );
};

export default Response;
