import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(taskName, taskDescription);
    setTaskName('');
    setTaskDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label className="title">Task Name</label>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Enter task name" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)}
          required 
        />
      </div>
      <div className="form-group">
        <label className="title">Task Description</label>
        <textarea 
          className="form-control" 
          placeholder="Enter task description" 
          value={taskDescription} 
          onChange={(e) => setTaskDescription(e.target.value)}
          required
          rows="4"
        />
      </div>
      <button className="btn btn-primary" id="centre" type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;

