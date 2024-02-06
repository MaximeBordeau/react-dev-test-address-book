import { FC, InputHTMLAttributes } from "react";

import $ from "./InputText.module.css";

type InputTextProps = InputHTMLAttributes<HTMLInputElement>

const InputText: FC<InputTextProps> = ({ name, onChange, placeholder, value }) => {
  return (
    <input
      className={$.inputText}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
      value={value}
    />
  );
};

export default InputText;
