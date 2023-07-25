import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { PlusCircle } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

import { Header } from './components/Header';
import { TaskItem } from './components/TaskItem';

import './global.css';
import styles from './App.module.css';

interface Task {
  content: string;
  isComplete: boolean;
}

export function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState(() => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [
    { content: "Terminar o projeto 01", isComplete: false }
  ];
 });
  
  const totalNumberOfTasks = tasks.length;
  const completedTasks = tasks.reduce((count: number, task: Task) => count + (task.isComplete ? 1 : 0), 0);

  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    setTasks([...tasks, { content: newTaskText, isComplete: false }]);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function markTaskAsCompleted(taskContent: string) {
    const updatedTasks = tasks.map((task: Task) => {
      if (task.content === taskContent) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter((task: Task) => {
      return task.content !== taskToDelete;
    })

    setTasks(tasksWithoutDeletedOne);
  }

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage();
  }, [tasks]);

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form className={styles.inputBar} onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTaskChange}
            value={newTaskText}
          />
          <button type="submit">
            Criar
            <PlusCircle size={16} />  
          </button>
        </form>

        <section className={styles.tasksTable}>
          <header>
            <div className={styles.createdTasks}>
              Tarefas criadas <span>{totalNumberOfTasks}</span>
            </div>
            <div className={styles.completedTasks}>
              Concluídas <span>{completedTasks} de {totalNumberOfTasks}</span>
            </div>
          </header>

          <ul>
            {
              tasks.map((task: Task) =>{
                return (
                  <li key={uuidv4()}>
                    <TaskItem                    
                      content={task.content}
                      onDeleteTask={deleteTask}
                      onMarkAsCompleted={() => markTaskAsCompleted(task.content)}
                      isComplete={task.isComplete}
                    />
                  </li>
                )
              })
            } 
          </ul>
        </section>
      </div>

    </div>
  )
}
