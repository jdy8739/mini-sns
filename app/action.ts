'use server';

type Form = {
  email: string;
  username: string;
  password: string;
  isTried: boolean;
  isCorrect: boolean;
};

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const handleOnSubmit = async (_: Form, current: FormData) => {
  await wait(1000);

  const email = current.get('email');

  const username = current.get('username');

  const password = current.get('password');

  return {
    email,
    username,
    password,
    isTried: true,
    isCorrect: !!email && !!username && password === '12345',
  };
};

export default handleOnSubmit;
export type { Form };
