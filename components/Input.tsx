/* eslint-disable no-nested-ternary */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: string[];
  isNormal: boolean;
  showError: boolean;
}

const Input = ({ errors, isNormal, showError, ...rest }: InputProps) => {
  return (
    <>
      <input
        className={`ring-2 ${isNormal ? 'ring-slate-400' : !errors ? 'ring-green-400' : 'ring-red-400'} outline-none w-full p-2 rounded-xl`}
        {...rest}
      />
      <div
        className={`${isNormal ? 'text-slate-400' : !errors ? 'text-green-400' : 'text-red-400'} font-extrabold`}
      >
        {showError && errors?.[0]}
      </div>
    </>
  );
};

export default Input;
