import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface TextinputProps {
  defaultValue?: string;
  title?: string;
  className?: string;
  isBorderless?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

let Textinput = React.forwardRef<HTMLInputElement, TextinputProps>(
  
  ({ isBorderless = false, ...props }, ref) => {
    let TextinputClass: string = clsx(
      { [styles.noBorder]: isBorderless },
      styles.textinput,
      props.className
    );

    return (
      <input type="text" className={TextinputClass} {...props} ref={ref} />
    );
  }
);

export default React.memo(Textinput);
