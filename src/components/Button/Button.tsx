import styles from "./styles.module.css";
import clsx from "clsx";

interface ButtonProps {
  size?: "md" | "lg";
  onClick?: () => void;
  variant?: "primary" | "secondary";
  color?: "default" | "danger";
  disabled?: boolean;
  children: string;
  className?: string;
}

let Button: React.FC<ButtonProps> = ({ size='lg', variant='primary', color='default', className, ...props }) => {

  let buttonClass = clsx(
    styles.button,
    styles[size],
    styles[color],
    styles[variant],
    { [styles.disabled]: props.disabled },
    className
  );

  return (
    <button
      className={buttonClass}
      {...props} 
    >
      {props.children}
    </button>
  );
};

export default Button;
