'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

import { CreateAccountResult, handleOnSubmit } from './action';

import Button from '@/components/button';
import Input from '@/components/Input';

const Submit = ({ isTried, errors }: CreateAccountResult) => {
  const { pending } = useFormStatus();

  const isNormal = !isTried || pending;

  const isCertified = Object.keys(errors).length === 0;

  const showError = isTried && !pending;
  return (
    <div className="h-lvh w-full flex justify-center">
      <div className="flex flex-col justify-center items-center gap-3 h-full w-80 focus-within::outline-none text-slate-400">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          showError={showError}
          isNormal={isNormal}
          errors={errors.email}
        />
        <Input
          type="username"
          name="username"
          placeholder="Username"
          required
          showError={showError}
          isNormal={isNormal}
          errors={errors.username}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          showError={showError}
          isNormal={isNormal}
          errors={errors.password}
        />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Password Confirm"
          required
          showError={showError}
          isNormal={isNormal}
          errors={errors.passwordConfirm}
        />
        <Button
          pending={pending}
          isTried={isTried}
          isNormal={isNormal}
          isCertified={isCertified}
        />
        <Link
          href="/log-in"
          className="w-full p-4 rounded-lg font-semibold transition-all duration-200 text-white shadow-sm bg-blue-600 hover:bg-blue-700 text-center"
        >
          To log in
        </Link>
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
    <main>
      <form className="flex flex-col" action={formAction}>
        <Submit {...state} />
      </form>
    </main>
  );
};

export default CreateAccountPage;
