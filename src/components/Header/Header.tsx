import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface HeaderProps {
  total: number,
  className?: string,
};


let Header: React.FC<HeaderProps> = ({ total, className }) => {

  let HeaderClass = clsx(
    styles.header,
    className
  );
  
  if (!total) {
    return <header className={HeaderClass}>no tasks</header>;
  } else {
    return (
      <header className={HeaderClass}>
        {`You have ${total} ${total > 1 ? "Todos" : "Todo"}`}
      </header>
    );
  }
}



export default React.memo(Header);
