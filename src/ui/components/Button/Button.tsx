import cx from "classnames";

import $ from "./Button.module.css";
import { FC, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant: "primary" | "secondary";
};

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // or 'secondary'
}) => {
  return (
    <button
     // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
    
      className={cx($.button, {
        [$.primary]: variant === "primary",
        [$.secondary]: variant === "secondary",
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
