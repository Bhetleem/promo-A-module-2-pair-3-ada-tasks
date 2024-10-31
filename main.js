"use strict";

const list = document.querySelector(".js-list");

const GITHUB_USER = "Marta-ms";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;

/* Por cada elemento de la lista 
    pintar la tarea en el html */

/*const tasks = [
    { name: "Recoger setas en el campo", completed: true, id: 1 },
    { name: "Comprar pilas", completed: true, id: 2 },
    { name: "Poner una lavadora de blancos", completed: true, id: 3 },
    {
      name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
      completed: false,
      id: 4,
    },
  ];*/

  let tasks = [];

  fetch(SERVER_URL)
  .then((response) => {
    return response.json();
  })

  .then ((data) => {
    tasks = data.results;
    console.log(data);
    

    for(const task of tasks){
  
      list.innerHTML +=  `<li><input type="checkbox" id="${task.id}">${task.name}</li>`
    }
    
  })



//Queremos que cuando la usuaria haga click en cualquiera de los checkbox la tarea se tache

/*
-Cuando la usuaria hace click la tarea se tacha
- cuando la tarea se tacha aparece como completada*/

const handleClickList = (event) => {
  const taskComplete = parseInt(event.target.id);
  console.log(taskComplete);
};

list.addEventListener("click", handleClickList);

