import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface ClosebuttonProps {
  isIconOnly?: boolean;
  className?: string;
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
}

let Closebutton: React.FC<ClosebuttonProps> = ({ isIconOnly = false, ...props}) => {

  let ClosebuttonClass = clsx(
    { [styles.iconOnly]: isIconOnly },
    { [styles.disabled]: props.disabled },
    styles.close_button,
    props.className
  );
  
  return <button className={ClosebuttonClass} {...props} />;
};

export default React.memo(Closebutton);
