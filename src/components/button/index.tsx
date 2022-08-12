import "./button.scss";

type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  buttonSize?: ButtonSize,
}

export const Button = ({ buttonSize = "small", children, className, ...props }: ButtonProps) => {

  return (
    <button
      className={`button button--${buttonSize} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
