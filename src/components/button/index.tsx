import "./button.scss";

type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement>{
  buttonSize?: ButtonSize,
}

export const Button = ({ buttonSize = "small", children, className }: ButtonProps) => {

  return (
    <button
      className={`button button--${buttonSize} ${className || ""}`}
    >
      {children}
    </button>
  );
};
