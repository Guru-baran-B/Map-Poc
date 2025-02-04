import React from "react";
import styles from "./styles.module.css";
import Task from "../Task";

interface TaskItem {
  id: string;
  task: string;
  isCompleted: boolean;
}

interface TasklistProps {
  data: TaskItem[]; 
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, value: string) => void;
};

const Tasklist: React.FC<TasklistProps> = ({ data, onToggle, onDelete, onUpdate }) => {

  return (
    <>
      {data?.map((item) => (
        <Task
          id={item.id}
          isCompleted={item.isCompleted}
          task={item.task}
          key={item.id}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
}

export default React.memo(Tasklist);
