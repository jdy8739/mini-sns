'use client';

import { Response as ResponseType } from '@prisma/client';
import { useEffect, useState } from 'react';
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

const Response = ({
  userId,
  tweetId,
  responses,
}: {
  userId: number;
  tweetId: number;
  responses: ResponseType[];
}) => {
  const [responseList, setResponseList] = useState<ResponseType[]>(responses);

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

  useEffect(() => {
    if (state.id) {
      setResponseList((prev) => [
        ...prev,
        {
          id: state.id!,
          content: state.content,
          tweetId: state.tweetId,
          createdAt: new Date(),
          userId,
        },
      ]);
    }
  }, [userId, state]);

  return (
    <div>
      {responseList.map((response) => (
        <div key={response.id}>{response.content}</div>
      ))}
      -------
      <div>{state.errors.content?.[0]}</div>
      <form action={formAction}>
        <Submit tweetId={tweetId} />
      </form>
    </div>
  );
};

export default Response;
