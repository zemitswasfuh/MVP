const createButton = document.querySelector(".create-button");
const taskContainer = document.querySelector(".tasks-container")

$.get('/api/todo', data => {
  // console.log(data);
//loop through the data object and 
//append the contents to a newly created div
for (let taskObj of data) {
  let task = taskObj.task;
  let priorirty = taskObj.priorirty;
  const newTaskEl = document.createElement('div');
  newTaskEl.textContent = task + ' - ' + "Priority: " + priorirty;
  taskContainer.append(newTaskEl);
}
});

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