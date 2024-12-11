import React from "react";
import "./input.scss";


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  fullWidth?: boolean;
  groupProps?: React.HTMLAttributes<HTMLDivElement>;
  label?: string;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ error, fullWidth, groupProps = {}, label, ...props }, ref) => {
  return (
    <div {...groupProps} className={`input-group ${groupProps?.className}`}>
      <label className="input-label" htmlFor={props.id}>{label}</label>
      <input className={`input ${error && "input-error"} ${fullWidth && "input-fullwidth"}`} ref={ref} {...props} />
      {error && typeof error === "string" && <div className="input-error-label">{error}</div>}
    </div>
  )
});

export interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  error?: string | boolean;
  fullWidth?: boolean;
  groupProps?: React.HTMLAttributes<HTMLDivElement>;
  label?: string;
  options: Array<{ label: string, value: string }>;
}
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ error, fullWidth, groupProps = {}, label, options, ...props }, ref) => {
  return (
    <div {...groupProps} className={`input-group ${groupProps?.className}`}>
      <label className="input-label" htmlFor={props.id}>{label}</label>
      <select className={`input ${error && "input-error"} ${fullWidth && "input-fullwidth"}`} ref={ref} {...props}>
        <option key="placeholder" value="">{props.placeholder}</option>
        {options.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)}
      </select>
      {error && typeof error === "string" && <div className="input-error-label">{error}</div>}
    </div>
  )
});