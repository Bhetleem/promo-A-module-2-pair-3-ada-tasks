"use strict";

const list = document.querySelector(".js-list");

const GITHUB_USER = "Marta-ms";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;


//Queremos que cuando la usuaria haga click en cualquiera de los checkbox la tarea se tache

/*
-Cuando la usuaria hace click la tarea se tacha
- cuando la tarea se tacha aparece como completada*/

/* const handleClickList = (event) => {
  const taskComplete = parseInt(event.target.id);
  console.log(taskComplete);
};

list.addEventListener("click", handleClickList);*/

let tasks = [];

/* Ejercicio añadir una nueva tarea */

const addTask = document.querySelector(".js-newTask");
const buttonAdd = document.querySelector(".js-button"); 

const handleNewTask = (event) => {
  event.preventDefault();

  // 1. Recoge el nombre de la tarea
  const name = addTask.value;

  // 2. Crea un objeto para la nueva tarea
  const newTask = {
    name: addTask.value, 
    completed: false,
  };

  // 3. Añade la nueva tarea al array de tareas
  tasks.push(newTask);
  //console.log(tasks)

  // 4. Vuelve a pintar las tareas
  list.innerHTML = ""; //borra las tareas ya pintadas

  renderTasks();
};

buttonAdd.addEventListener("click", handleNewTask);


/* Ejercicio: guardar la lista de tareas en el Local Storage
    - Si la lista de tareas está almacenada => la pintamos desde el localStorage
    - Si no, le hacemos la peticion al servidor */

const tasksLocalStorage = JSON.parse(localStorage.getItem("tasksFromServer"));
// parse: pasa el string a un array o un objeto //

function renderTasks(){
  for(const task of tasks){
    // list.innerHTML +=  `<li><input type="checkbox" id="${task.id}">${task.name}</li>`
    /* crear la <li> con DOM avanzado */
    const liElement = document.createElement("li");
    list.appendChild(liElement);

    const inputElement = document.createElement("input");
    liElement.appendChild(inputElement);
    inputElement.setAttribute("type", "checkbox");
    inputElement.setAttribute("id", task.id);
    inputElement.setAttribute("name", task.name);
    const contentInputElement = document.createTextNode(task.name);
    liElement.appendChild(contentInputElement);
    }

}

if (tasksLocalStorage !== null){
  tasks = tasksLocalStorage;
  renderTasks()

}else{
fetch(SERVER_URL)
.then((response) => { 
  return response.json();
})
.then ((data) => {
  tasks = data.results;
  localStorage.setItem("tasksFromServer", JSON.stringify(tasks)); //usamos stringify para pasar las tareas a string, ya que el navegador solo guarda strings //
   //console.log(data);
  renderTasks()
  });
}

//tachar la tarea terminada
const handleTaskComplete=(event) => {
  const taskId = parseInt(event.target.id);
  if (!taskId) return;
}

list.addEventListener("click", handleTaskComplete);
