import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  unit: "px";
}

const Input = ({
  type,
  onChange,
  className,
  value,
  unit,
  ...rest
}: InputProps) => {
  return (
    <div className="flex items-center gap-[6px]">
      <input
        type={type}
        onChange={onChange}
        value={value}
        className={`w-12 h-7 text-sm text-center outline-none focus:ring-2 focus:ring-blue-600 bg-blue-100 py-1 px-2 rounded-md text-gray-800 font-semibold ${className}`}
        {...rest}
      />
      <span className="select-none">{unit}</span>
    </div>
  );
};

export default Input;
