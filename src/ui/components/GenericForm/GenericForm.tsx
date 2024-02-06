import { FC, ReactNode, FormEvent } from "react";
import Button from "../Button/Button";

import $ from "./GenericForm.module.css"

type FormProps = {
  legend: string;
  onSubmit: (e: FormEvent) => void;
  children: ReactNode;
  btnText?: string;
};

const GenericForm: FC<FormProps> = ({
  legend,
  onSubmit,
  children,
  btnText = "Submit",
}) => {
  return (
    <form className={$.form} onSubmit={onSubmit}>
      <fieldset className={$.fieldset}>
        <legend>{legend}</legend>
        {children}
        <Button type="submit" variant="primary">
          {btnText}
        </Button>
      </fieldset>
    </form>
  );
};

export default GenericForm;
