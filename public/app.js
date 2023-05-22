const createButton = document.querySelector(".create-button");
const taskContainer = document.querySelector(".tasks-container");
const deleteButton = document.createElement("BUTTON");

// $.get('/api/todo', data => {
// //*** Loop through data object provided by database and append to doc.body ***
// for (let taskObj of data) {
//   let task = taskObj.task;
//   let priorirty = taskObj.priorirty;
//   const newTaskEl = document.createElement('div');
//   newTaskEl.textContent = task + ' - ' + "Priority: " + priorirty;
//   taskContainer.append(newTaskEl);
// //*** Create and append Delete button to each element ***
//   deleteButton.innerHTML = "Delete";
//   deleteButton.addEventListener('click', function() {
//     const taskId = taskObj.id;
//   });
//   newTaskEl.append(deleteButton);
// }
// });

function deleteTask(taskId) {
  fetch(`/api/todo/${taskId}`, {
    method: 'DELETE'
  })
    .then((response) => {
      if (response.ok) {
        console.log('Task deleted successfully');
      } else {
        console.error('Error deleting task');
      }
    })
    .catch((error) => {
      console.error('Error deleting task:', error);
    });
}

$.get('/api/todo', data => {
//*** Loop through data object provided by database and append to doc.body ***
  for (let taskObj of data) {
    let taskId = taskObj.id; // Obtain the task ID
    let task = taskObj.task;
    let priorirty = taskObj.priorirty;
    const newTaskEl = document.createElement('div');
    newTaskEl.textContent = task + ' - ' + "Priority: " + priorirty;
    taskContainer.append(newTaskEl);
//*** Create and append Delete button to each element ***
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener('click', function() {
      deleteTask(taskId); // Pass the task ID to the deleteTask function
      newTaskEl.remove(); // Remove the task element from the DOM
    });
    newTaskEl.append(deleteButton);
  }
});


//*** Modal creation ***/
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');
const closeModalBtn = document.getElementsByClassName('close')[0];
const submitBtn = document.querySelector(".submit")
const form = document.querySelector('form');

openModalBtn.addEventListener('click', function() {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const taskInput = document.getElementById('task');
  const priorityInput = document.getElementById('priority');
  const taskValue = taskInput.value;
  const priorityValue = parseInt(priorityInput.value); // Parse value as an integer
  modal.style.display = 'none';
  const newTaskEl = document.createElement('div');
  newTaskEl.textContent = taskValue + ' - ' + priorityValue;
  taskContainer.append(newTaskEl);
  console.log("task: " + taskValue);
  console.log(typeof priorityValue);
   // Send the form data to the server
  const formData = {
    task: taskValue,
    priorirty: Number(priorityValue)
  };  
  console.log("form Data" + formData);
  // $.post('/api/todo', formData)
  // .done(function(data) {
  //   console.log('Form data sent successfully:', data);
  //   // Handle any further actions after the form submission
  // })
  // .fail(function(jqXHR, textStatus, errorThrown) {
  //   console.error('Error submitting form:', errorThrown);
  //   // Handle errors if the form submission fails
  // });
  fetch('/api/todo', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
  });
});