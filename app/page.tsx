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

  const resultColor = isCorrect ? 'green-400' : 'red-400';

  const theme = !isTried || pending ? 'slate-400' : resultColor;

  return (
    <div className="h-lvh w-full flex justify-center">
      <div className="flex flex-col justify-center items-center gap-3 h-full w-80 focus-within::outline-none text-slate-400">
        <input
          type="email"
          className="ring-2 ring-slate-400 outline-none w-full p-2 rounded-xl"
          name="email"
          placeholder="Email"
        />
        <input
          className="ring-2 ring-slate-400 outline-none w-full p-2 rounded-xl"
          name="username"
          placeholder="Username"
        />
        <input
          type="password"
          className={`ring-2 ring-${theme} outline-none w-full p-2 rounded-xl`}
          name="password"
          placeholder="Password"
        />
        <div className={`h-6 text-${theme} font-extrabold`}>
          {isTried &&
            !pending &&
            (isCorrect ? 'correct password' : 'wrong password')}
        </div>
        <button
          type="submit"
          disabled={pending}
          className={`w-full p-3 rounded-xl font-bold bg-${theme} text-white`}
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
