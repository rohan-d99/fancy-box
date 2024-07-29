import React, { HTMLAttributes } from "react";

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  title: string;
}

const Label = ({ title, className, ...rest }: LabelProps) => {
  return (
    <label
      className={`select-none text-base font-semibold text-gray-700 ${className}`}
      {...rest}
    >
      {title}
    </label>
  );
};

export default Label;
