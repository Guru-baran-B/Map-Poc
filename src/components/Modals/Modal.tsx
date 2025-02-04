import React from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";

import Button from "../Button";
import CloseButton from "../Closebutton";

interface ModalProps {
  onConfirm?: () => void;
  children?: string;
  type?: string;
  onReject?: () => void;
  onModalClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  onConfirm,
  children,
  type,
  onReject,
  onModalClose,
}) => {
  const modalRoot = document.getElementById("modal");

  if (!modalRoot) {
    console.error("Modal root not found.");
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.modal}>
        <CloseButton
          isIconOnly={true}
          onClick={() => {
            onModalClose?.();
          }}
        />
        <div className={styles.message}>
          <p>{children}</p>
          <div className={styles.button_container}>
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                onConfirm?.();
              }}
            >
              {type === "prompt" ? "Yes" : "Ok"}
            </Button>
            {type === "prompt" && (
              <Button
                variant="secondary"
                size="md"
                color="danger"
                onClick={() => {
                  onReject?.();
                }}
              >
                No
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
