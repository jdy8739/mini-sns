/* eslint-disable no-nested-ternary */

'use client';

import { useFormState, useFormStatus } from 'react-dom';
import handleOnSubmit, { Form } from './action';

const Submit = ({
  isCorrect,
  isTried,
}: {
  isCorrect: boolean;
  isTried: boolean;
}) => {
  const { pending } = useFormStatus();

  const isNormal = !isTried || pending;

  return (
    <div className="h-lvh w-full flex justify-center">
      <div className="flex flex-col justify-center items-center gap-3 h-full w-80 focus-within::outline-none text-slate-400">
        <input
          type="email"
          className="ring-2 ring-slate-400 outline-none w-full p-2 rounded-xl"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="ring-2 ring-slate-400 outline-none w-full p-2 rounded-xl"
          name="username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          className={`ring-2 ${isNormal ? 'ring-slate-400' : isCorrect ? 'ring-green-400' : 'ring-red-400'} outline-none w-full p-2 rounded-xl`}
          name="password"
          placeholder="Password"
          required
        />
        <div
          className={`h-6 ${isNormal ? 'text-slate-400' : isCorrect ? 'text-green-400' : 'text-red-400'} font-extrabold`}
        >
          {isTried &&
            !pending &&
            (isCorrect ? 'correct password' : 'wrong password')}
        </div>
        <button
          type="submit"
          disabled={pending}
          className={`w-full p-3 rounded-xl font-bold ${isNormal ? 'bg-slate-400' : isCorrect ? 'bg-green-400' : 'bg-red-400'} text-white`}
        >
          {!isTried
            ? 'submit'
            : pending
              ? 'loading'
              : isCorrect
                ? "Let's go!"
                : 'Oh No..'}
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [state, formAction] = useFormState<Form>(
    handleOnSubmit as unknown as (state: Form) => Form,
    {
      email: '',
      username: '',
      password: '',
      isTried: false,
      isCorrect: false,
    },
  );

  return (
    <div>
      <form className="flex flex-col" action={formAction}>
        <Submit {...state} />
      </form>
    </div>
  );
}
