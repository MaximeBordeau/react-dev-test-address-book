import { FC, ReactNode } from "react";
import cx from "classnames";

import $ from "./Section.module.css";

type SectionProps = {
  variant: "dark" | "light";
  children: ReactNode;
};

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
