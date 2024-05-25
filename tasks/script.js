document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const todoTableBody = document.getElementById('todoTableBody');
  
    todoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      addTask(taskInput.value, descriptionInput.value);
      taskInput.value = '';
      descriptionInput.value = '';
    });
  
    function addTask(taskName, taskDescription) {
      const row = document.createElement('tr');
      
      const taskNameCell = document.createElement('td');
      taskNameCell.textContent = taskName;
  
      const taskDescriptionCell = document.createElement('td');
      taskDescriptionCell.textContent = taskDescription;
  
      const statusCell = document.createElement('td');
      statusCell.textContent = 'Incomplete';
      statusCell.classList.add('status');
  
      const actionsCell = document.createElement('td');
      
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Toogle Status';
      completeButton.classList.add('btn', 'btn-success', 'mr-2');
      completeButton.addEventListener('click', () => {
        taskNameCell.classList.add('completed');
        taskDescriptionCell.classList.add('completed');
        statusCell.textContent = 'Completed';
        completeButton.disabled = true;
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.addEventListener('click', () => {
        row.remove();
      });
  
      actionsCell.appendChild(completeButton);
      actionsCell.appendChild(deleteButton);
      
      row.appendChild(taskNameCell);
      row.appendChild(taskDescriptionCell);
      row.appendChild(statusCell);
      row.appendChild(actionsCell);
      
      todoTableBody.appendChild(row);
    }
  });
  
  