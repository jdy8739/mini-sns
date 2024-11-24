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
      className={`w-full p-4 rounded-lg font-semibold transition-all duration-200 
        ${pending ? 'cursor-not-allowed opacity-70' : 'hover:opacity-90'}
        ${
          isNormal
            ? 'bg-blue-600 hover:bg-blue-700'
            : isCertified
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'bg-rose-500 hover:bg-rose-600'
        } text-white shadow-sm`}
      {...rest}
    >
      {!isTried ? (
        <span>Submit</span>
      ) : pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : isCertified ? (
        <span>Success! Let&apos;s go!</span>
      ) : (
        <span>Please fix errors...</span>
      )}
    </button>
  );
};

export default Button;
