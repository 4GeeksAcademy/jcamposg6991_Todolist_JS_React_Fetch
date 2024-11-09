import React, { useState, useEffect } from "react";

const ToDoList = () => {
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function createUser() {
    fetch("https://playground.4geeks.com/todo/users/jcamposg6991", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 400) {
          return getUser(); // Si el usuario ya existe, cargar datos de usuario
        }
        return response.json();
      })
      .catch((error) => console.log(error));
  }

  function getUser() {
    return fetch("https://playground.4geeks.com/todo/users/jcamposg6991", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  }

  function getTodos() {
    return fetch("https://playground.4geeks.com/todo/users/jcamposg6991", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.log(error));
  }

  function createTodo(todo) {
    if (todo.trim() !== "") {
      return fetch("https://playground.4geeks.com/todo/todos/jcamposg6991", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: todo,
          is_done: "false",
        }),
      })
        .then((response) => response.json())
        .then(() => {
          setInputValue(""); 
          return getTodos(); 
        })
        .catch((error) => console.log(error));
    }
    console.log("No se ha ingresado tarea");
  }

  function deleteTodo(todoId){
    return fetch("https://playground.4geeks.com/todo/todos/"+todoId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response)
    .then(() => {
      return getTodos(); 
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
  }



  useEffect(() => {
    createUser();
    getUser();
    getTodos();
  }, []);

  return (
    <div className="text-center toDoList">
      <h1>To Do List</h1>
      <h2>Usuario: {user.name}</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && createTodo(inputValue)}
        placeholder="¿Cuál es la tarea a realizar?"
      />
      <ul>
        {todos.length === 0 ? (
          <li className="task-item">No hay tareas registradas</li>
        ) : (
          todos.map((item) => (
            <li key={item.id} className="task-item">
              {item.label}
              <button className="delete-button" onClick={()=>deleteTodo(item.id)}>X</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
