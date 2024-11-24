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
        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
          isNormal
            ? 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            : !errors
              ? 'border-emerald-400 focus:ring-emerald-500 focus:border-emerald-500'
              : 'border-rose-400 focus:ring-rose-500 focus:border-rose-500'
        }`}
        {...rest}
      />
      <div
        className={`mt-2 text-sm font-medium ${
          isNormal
            ? 'text-gray-500'
            : !errors
              ? 'text-emerald-600'
              : 'text-rose-600'
        }`}
      >
        {showError && errors?.[0]}
      </div>
    </>
  );
};

export default Input;
