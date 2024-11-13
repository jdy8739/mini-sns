'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleOnSubmit, FormResult } from './action';
import Input from '@/components/Input';
import Button from '@/components/button';

const Submit = ({ isTried, errors }: FormResult) => {
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
          showError={isTried && !pending}
          isNormal={isNormal}
          errors={errors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          showError={isTried && !pending}
          isNormal={isNormal}
          errors={errors.password}
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

const LoginPage = () => {
  const [state, formAction] = useFormState<FormResult>(
    handleOnSubmit as unknown as (state: FormResult) => FormResult,
    {
      email: '',
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
