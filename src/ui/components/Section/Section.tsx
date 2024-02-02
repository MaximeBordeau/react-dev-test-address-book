import { FC, ReactChild } from "react";
import cx from "classnames";

import $ from "./Section.module.css";

type SectionProps = {
  variant: "dark" | "light",
  children: ReactChild
}

const Section: FC<SectionProps> = ({ children, variant = "light" }) => {
  return (
    <section
      className={cx($.section, {
        [$.light]: variant === "light",
        [$.dark]: variant === "dark",
      })}
    >
      {children}
    </section>
  );
};

export default Section;
