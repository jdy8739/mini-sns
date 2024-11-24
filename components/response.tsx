'use client';

import { Response as ResponseType } from '@prisma/client';
import { useCallback, useEffect, useOptimistic, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { revalidateResponsesAfterDelete } from '@/app/action';
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
        value={pending ? 'uploading response...' : content}
        required
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Write a response..."
      />
      <button
        type="submit"
        disabled={pending}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Response
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
    <div className="space-y-6">
      {optimisticResponseList.map((response) => (
        <div
          key={response.id}
          className="p-4 bg-white rounded-lg shadow-sm border"
        >
          <div>
            <p className="text-gray-900">{response.content}</p>
          </div>
          {response.userId === userId && (
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                className="text-sm text-red-500 hover:text-red-600 transition-colors px-3 py-1 rounded-md hover:bg-red-50"
                onClick={() =>
                  revalidateResponsesAfterDelete({
                    tweetId,
                    responseId: response.id,
                  })
                }
              >
                delete
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="border-t border-gray-200 pt-6">
        <div className="text-red-500 text-sm mb-4">
          {state.errors.content?.[0]}
        </div>
        <form action={handleOnFormSubmit} className="space-y-4">
          <Submit
            tweetId={tweetId}
            isSuccess={Object.keys(state.errors).length === 0}
          />
        </form>
      </div>
    </div>
  );
};

export default Response;
