import { FC } from "react";

import $ from "./ErrorMessage.module.css";

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<IErrorMessageProps> = ({ message }) => {
  return <div className={`${$.message}`}>{message}</div>;
};

export default ErrorMessage;
