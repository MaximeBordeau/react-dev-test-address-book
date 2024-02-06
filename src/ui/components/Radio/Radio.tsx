import { ChangeEventHandler, FC, ReactNode } from "react";

import $ from "./Radio.module.css";
 
//TODO: Type Radio Component

type RadioProps = {
  children: ReactNode;
  id: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Radio: FC<RadioProps> = ({ children, id, name, onChange }) => {
  return (
    <div className={$.radio}>
      <input type="radio" id={id} name={name} onChange={onChange} value={id} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default Radio;
