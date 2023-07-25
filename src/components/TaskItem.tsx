import { Circle, CheckCircle, Trash } from 'phosphor-react';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  content: string;
  isComplete: boolean;
  onDeleteTask: (task: string) => void;
  onMarkAsCompleted: () => void;
}

export function TaskItem({ content, onDeleteTask, onMarkAsCompleted, isComplete }: TaskItemProps) {

  function handleDeleteTask() {
    onDeleteTask(content);
  }

  return (
    <div className={styles.taskItem}>
      {
        isComplete ? (
          <button onClick={onMarkAsCompleted}>
            <CheckCircle size={20} weight='fill' color="#5E60CE" />
          </button>
        ) : (
          <button onClick={onMarkAsCompleted}>
            <Circle size={20} weight='bold' color="#4EA8DE" />
          </button>
        )
      }

      <p>{content}</p>
      
      <button
        title="Deletar task"
        className={styles.deleteIcon}
        onClick={handleDeleteTask}
      >
        <Trash size={20} />
      </button>
    </div>
  );
}