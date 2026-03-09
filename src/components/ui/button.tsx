"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>  {
  variant?: "primary" | "secondary" | "danger";
}

// Easiest way to declare a Function Component; return type is inferred.
// const App = ({ message }: AppProps) => <div>{message}</div>;

// You can choose to annotate the return type so an error is raised if you accidentally return some other type
// const App = ({ message }: AppProps): React.JSX.Element => <div>{message}</div>;

// You can also inline the type declaration; eliminates naming the prop types, but looks repetitive
// const App = ({ message }: { message: string }) => <div>{message}</div>;

// Alternatively, you can use `React.FunctionComponent` (or `React.FC`), if you prefer.
// With latest React types and TypeScript 5.1. it's mostly a stylistic choice, otherwise discouraged.
// const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
//   <div>{message}</div>
// );
// or
// const App: React.FC<AppProps> = ({ message }) => <div>{message}</div>;

// export const Button: React.FC<ButtonProps> = ({
//   children,
//   variant = "primary",
//   className = "",
//   ...props
// })

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  // console.log(Object.keys(props));

  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a] disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 focus:ring-blue-500",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-slate-100 focus:ring-slate-500",
    danger:
      "bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 focus:ring-red-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
