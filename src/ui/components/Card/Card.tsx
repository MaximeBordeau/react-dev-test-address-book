import { FC, ReactChild } from "react";

import $ from "./Card.module.css";

type CardProps = {
  children: ReactChild
}

const Card: FC<CardProps> = ({ children }) => {
  return <div className={$.card}>{children}</div>;
};

export default Card;
