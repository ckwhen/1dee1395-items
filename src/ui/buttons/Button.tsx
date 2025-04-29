import { twMerge } from 'tailwind-merge';
import { ButtonTypes } from '../../utils/contants';

const {
  DEFAULT: DEFAULT_TYPE,
  PRIMARY: PRIMARY_TYPE,
} = ButtonTypes;

export type ButtonProps = Omit<React.ComponentProps<"button">, "type"> & {
  type?: typeof DEFAULT_TYPE | typeof PRIMARY_TYPE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text?: any,
};

function Button({
  type = DEFAULT_TYPE,
  text,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={twMerge(
        'px-5 py-1.5 border-1 font-medium rounded-md',
        'border-darkblue-300 hover:cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:ring-1 focus:ring-darkblue-100 focus:outline-none',
        type === DEFAULT_TYPE && ([
          'text-darkblue-300 bg-white',
          'hover:text-darkblue-400 hover:border-darkblue-400'
        ]),
        type === PRIMARY_TYPE && (
          'text-white bg-darkblue-300 hover:bg-darkblue-400'
        ),
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
