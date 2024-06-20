import React from 'react';

function TaskTable({ tasks, toggleTaskStatus, deleteTask }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Task Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index}>
            <td className={task.completed ? 'completed' : ''}>{task.name}</td>
            <td className={task.completed ? 'completed' : ''}>{task.description}</td>
            <td className="status">{task.completed ? 'Completed' : 'Incomplete'}</td>
            <td>
              <button 
                className="btn btn-success mr-2" 
                onClick={() => toggleTaskStatus(index)}
                disabled={task.completed}
              >
                Toggle Status
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskTable;

