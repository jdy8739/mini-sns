/* eslint-disable no-nested-ternary */

'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { CreateAccountResult, handleOnSubmit } from './action';
import Input from '@/components/Input';

const Submit = ({ isTried, errors }: CreateAccountResult) => {
  const { pending } = useFormStatus();

  const isNormal = !isTried || pending;

  const isCertified = Object.keys(errors).length === 0;

  return (
    <div className="h-lvh w-full flex justify-center">
      <div className="flex flex-col justify-center items-center gap-3 h-full w-80 focus-within::outline-none text-slate-400">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          isTried={isTried}
          isNormal={isNormal}
          pending={pending}
          errors={errors.email}
        />
        <Input
          type="username"
          name="username"
          placeholder="Username"
          required
          isTried={isTried}
          isNormal={isNormal}
          pending={pending}
          errors={errors.username}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          isTried={isTried}
          isNormal={isNormal}
          pending={pending}
          errors={errors.password}
        />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Password Confirm"
          required
          isTried={isTried}
          isNormal={isNormal}
          pending={pending}
          errors={errors.passwordConfirm}
        />
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

const CreateAccountPage = () => {
  const [state, formAction] = useFormState<CreateAccountResult>(
    handleOnSubmit as unknown as (
      state: CreateAccountResult,
    ) => CreateAccountResult,
    {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
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

export default CreateAccountPage;
