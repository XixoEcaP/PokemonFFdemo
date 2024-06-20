import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import '../../App.css'; // Ensure this is the correct path for your CSS

function ToDoApp() {
  const [tasks, setTasks] = useState([]);

  const addTask = (name, description) => {
    setTasks([...tasks, { name, description, completed: false }]);
  };

  const toggleTaskStatus = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskTable tasks={tasks} toggleTaskStatus={toggleTaskStatus} deleteTask={deleteTask} />
    </div>
  );
}

export default ToDoApp;

