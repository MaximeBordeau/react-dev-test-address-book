import { FC } from "react";

import $ from "./Radio.module.css";

//TODO: Type Radio Component
type RadioProps = any

const Radio: FC<RadioProps> = ({ children, id, name, onChange }) => {
  return (
    <div className={$.radio}>
      <input type="radio" id={id} name={name} onChange={onChange} value={id} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export default Radio;
