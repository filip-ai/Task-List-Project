// Define UI Vars 
const form = document.querySelector('#task-form'); //(1)
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event listeners
loadEventListeners();

//load all event listeners 
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);

}

//Get tasks from Local Storage
function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //***********Create li element**************//
    const li = document.createElement('li');

    //add class
    li.className = 'collection-item';

    //create text node and append to li
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content';

    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'

    //append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  })
}


//add task
function addTask(e){
  if(taskInput.value === ''){ 
    alert('Add a task');
  }



  //***********Create li element**************//
  const li = document.createElement('li');

  //add class
  li.className = 'collection-item';

  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //create new link element
  const link = document.createElement('a');

  //add class
  link.className = 'delete-item secondary-content';

  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'

  //append the link to li
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

  //Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = '';

  //**********Created element***************//

  console.log(li);
  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}




// Remove Task
function removeTask(e){
  if (e.target.parentElement.classList.contains
  ('delete-item')) {
    if (confirm('Are You Sure?')) {
    e.target.parentElement.parentElement.remove();

    //Remove from local storge
    removeTaskfromlocalstorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from local storage
function removeTaskfromlocalstorage(taskitem){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if (taskitem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Clear Tasks
function clearTasks(){
  while (taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from local storage
  clearTasksFromLocalStorage();
}

// Clear tasks from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}


//Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })  
}


//********** TASK LIST APPLICATION IS DONE **********

