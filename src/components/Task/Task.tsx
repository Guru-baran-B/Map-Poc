import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";
import Checkbox from "../Checkbox/Checkbox";
import Modal from "../Modals";
import Closebutton from "../Closebutton";
import Textinput from "../Textinput";

interface TaskProps {
  id: string;
  isCompleted?: boolean;
  task: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, value: string) => void;
}

interface ModalState {
  onConfirm?: () => void;
  message?: string;
  type?: string;
  onReject?: () => void;
  onModalClose?: () => void;
}

let Task: React.FC<TaskProps> = ({
  id,
  isCompleted,
  task,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  let [isModal, setIsModal] = useState(false);
  let [modalState, setModalState] = useState<ModalState>();

  function handleDelete(): void {
    if (isCompleted) {
      onDelete?.(id);
    } else {
      setModalState({
        onConfirm: () => {
          onDelete?.(id);
          setIsModal(false);
        },
        onReject: () => {
          setIsModal(false);
        },
        onModalClose: () => {
          setIsModal(false);
        },
        message: `Seems like You haven't completed this task! Are you sure, you want to remove?`,
        type: "prompt",
      });
      setIsModal(true);
    }
  }

  function handleCheck(): void {
    if (!isCompleted) {
      onToggle?.(id);
    } else {
      setModalState({
        onConfirm: () => {
          setIsModal(false);
          onToggle?.(id);
        },
        onReject: () => {
          setIsModal(false);
        },
        onModalClose: () => {
          setIsModal(false);
        },
        message: `Do you want to change the status to pending?`,
        type: "prompt",
      });
      setIsModal(true);
    }
  }

  return (
    <>
      {isModal && (
        <Modal
          onConfirm={modalState?.onConfirm}
          type={modalState?.type}
          onReject={modalState?.onReject}
          onModalClose={modalState?.onModalClose}
        >
          {modalState?.message}
        </Modal>
      )}
      <div
        className={`${styles.list_wrapper} ${isCompleted ? styles.completed : null}`}
      >
        <div className={`${styles.list_content}`}>
          <Checkbox
            checked={isCompleted}
            onChange={(e) => {
              handleCheck();
            }}
          />
          <Textinput
            isBorderless={true}
            title="Edit"
            onChange={(e) => {
              onUpdate(id, e.target.value);
            }}
            defaultValue={task}
            disabled={isCompleted}
          />
        </div>
        <Closebutton title="Delete" onClick={handleDelete} />
      </div>
    </>
  );
};

export default React.memo(Task);
