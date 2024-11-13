/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pending: boolean;
  isNormal: boolean;
  isTried: boolean;
  isCertified: boolean;
}

const Button = ({
  pending,
  isNormal,
  isTried,
  isCertified,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={pending}
      className={`w-full p-3 rounded-xl font-bold ${isNormal ? 'bg-slate-400' : isCertified ? 'bg-green-400' : 'bg-red-400'} text-white`}
      {...rest}
    >
      {!isTried
        ? 'submit'
        : pending
          ? 'loading'
          : isCertified
            ? "Let's go!"
            : 'Oh No..'}
    </button>
  );
};

export default Button;
