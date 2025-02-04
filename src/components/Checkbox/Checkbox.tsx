import React, { useRef } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

let Checkbox: React.FC<CheckboxProps> = ({className, ...props}) => {
  const checkBoxRef = useRef<HTMLInputElement | null>(null);

  let checkBoxClass = clsx(
    { [styles.disabled]: props.disabled },
    styles.checkBox,
    className
  );

  function handleClick() {
    checkBoxRef.current?.click();
  }

  return (
    <div
      className={checkBoxClass}
      title={`${!props.checked ? "Check" : "Uncheck"}`}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        className={styles.input}
        {...props}
        ref={checkBoxRef}
      />
      <svg viewBox="0 0 18 18">
        <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
        <polyline points="1 9 7 14 15 4"></polyline>
      </svg>
    </div>
  );
};

export default React.memo(Checkbox);
