import React from "react";
import "./input.scss";


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  fullWidth?: boolean;
  label?: string;
}
export const Input =  React.forwardRef<HTMLInputElement, InputProps>(({ error, fullWidth, label, ...props }, ref) => {
  return (
    <div className="input-group">
      <label className="input-label" htmlFor={props.id}>{label}</label>
      <input className={`input ${error && "input-error"} ${fullWidth && "input-fullwidth"}`} ref={ref} {...props} />
      {error && typeof error === "string" && <div className="input-error-label">{error}</div>}
    </div>
  )
})