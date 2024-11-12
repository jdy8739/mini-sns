/* eslint-disable no-nested-ternary */

'use client';

import { useFormState, useFormStatus } from 'react-dom';
import handleOnSubmit, { FormResult } from './action';

const Submit = ({ isTried, errors }: FormResult) => {
  const { pending } = useFormStatus();

  const isNormal = !isTried || pending;

  const isCertified = Object.keys(errors).length === 0;

  return (
    <div className="h-lvh w-full flex justify-center">
      <div className="flex flex-col justify-center items-center gap-3 h-full w-80 focus-within::outline-none text-slate-400">
        <input
          type="email"
          className={`ring-2 ${isNormal ? 'ring-slate-400' : !errors.email ? 'ring-green-400' : 'ring-red-400'} outline-none w-full p-2 rounded-xl`}
          name="email"
          placeholder="Email"
          required
        />
        <div
          className={`${isNormal ? 'text-slate-400' : !errors.email ? 'text-green-400' : 'text-red-400'} font-extrabold`}
        >
          {isTried && !pending && errors.email?.[0]}
        </div>
        <input
          className={`ring-2 ${isNormal ? 'ring-slate-400' : !errors.username ? 'ring-green-400' : 'ring-red-400'} outline-none w-full p-2 rounded-xl`}
          name="username"
          placeholder="Username"
          required
        />
        <div
          className={`${isNormal ? 'text-slate-400' : !errors.username ? 'text-green-400' : 'text-red-400'} font-extrabold`}
        >
          {isTried && !pending && errors.username?.[0]}
        </div>
        <input
          type="password"
          className={`ring-2 ${isNormal ? 'ring-slate-400' : !errors.password ? 'ring-green-400' : 'ring-red-400'} outline-none w-full p-2 rounded-xl`}
          name="password"
          placeholder="Password"
          required
        />
        <div
          className={`${isNormal ? 'text-slate-400' : !errors.password ? 'text-green-400' : 'text-red-400'} font-extrabold`}
        >
          {isTried && !pending && errors.password?.[0]}
        </div>
        <button
          type="submit"
          disabled={pending}
          className={`w-full p-3 rounded-xl font-bold ${isNormal ? 'bg-slate-400' : isCertified ? 'bg-green-400' : 'bg-red-400'} text-white`}
        >
          {!isTried
            ? 'submit'
            : pending
              ? 'loading'
              : isCertified
                ? "Let's go!"
                : 'Oh No..'}
        </button>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [state, formAction] = useFormState<FormResult>(
    handleOnSubmit as unknown as (state: FormResult) => FormResult,
    {
      email: '',
      username: '',
      password: '',
      isTried: false,
      errors: {},
    },
  );

  return (
    <div>
      <form className="flex flex-col" action={formAction}>
        <Submit {...state} />
      </form>
    </div>
  );
};

export default LoginPage;
