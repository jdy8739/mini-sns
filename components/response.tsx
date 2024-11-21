'use client';

import { Response as ResponseType } from '@prisma/client';
import { useCallback, useEffect, useOptimistic, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { ResponseFormResult, handleOnSubmit } from '@/app/tweet/[id]/action';

const Submit = ({
  tweetId,
  isSuccess,
}: {
  tweetId: number;
  isSuccess: boolean;
}) => {
  const { pending } = useFormStatus();

  const [content, setContent] = useState('');

  useEffect(() => {
    if (isSuccess && !pending) {
      setContent('');
    }
  }, [isSuccess, pending]);

  return (
    <>
      <input
        type="text"
        name="tweetId"
        readOnly
        className="hidden"
        value={tweetId}
      />
      <input
        type="text"
        name="content"
        disabled={pending}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" disabled={pending}>
        response
      </button>
    </>
  );
};

const Response = ({
  userId,
  tweetId,
  responses,
}: {
  userId: number;
  tweetId: number;
  responses: ResponseType[];
}) => {
  const [optimisticResponseList, addOptimisticResponseList] = useOptimistic(
    responses,
    (prev, newResponse: ResponseType) => [...prev, newResponse],
  );

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

  const handleOnFormSubmit = useCallback(
    async (formData: FormData) => {
      addOptimisticResponseList({
        id: Math.random(),
        content: formData.get('content') as string,
        tweetId: Number(formData.get('tweetId')),
        createdAt: new Date(),
        userId,
      });

      const action = formAction as unknown as (formData: FormData) => void;

      action(formData);
    },
    [addOptimisticResponseList, formAction, userId],
  );

  return (
    <div>
      {optimisticResponseList.map((response) => (
        <div key={response.id}>{response.content}</div>
      ))}
      -------
      <div>{state.errors.content?.[0]}</div>
      <form action={handleOnFormSubmit}>
        <Submit
          tweetId={tweetId}
          isSuccess={Object.keys(state.errors).length === 0}
        />
      </form>
    </div>
  );
};

export default Response;
