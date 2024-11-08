import React, { useState, useEffect } from "react";

const ToDoList = () => {

  const [user, setUser] = useState("")
  const [todos, setTodos] = useState([])

  function createUser() {
    return fetch("https://playground.4geeks.com/todo/users/jcamposg6991", { method: "POST", headers: { "Content-Type": "application/json" } })
      .then(response => response.json())
      .then((data) => console.log(data))
      .then((error) => console.log(error))
  }

  function getUser() {
    fetch("https://playground.4geeks.com/todo/users/jcamposg6991", { method: "GET" })
      .then(response => {
        if (response.status === 404) {
          createUser()
        }
        return response.json()
      })
      .then((data) => setUser(data))
      .catch((error) => console.log(error))
  }

  function getTodos() {
    return fetch("https://playground.4geeks.com/todo/users/jcamposg6991", { method: "GET" })
      .then(response => response.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.log(error))
  }



  useEffect(() => {
    getUser()
    getTodos()
  }, [])



  return (
    <div className="text-center toDoList">
      <h1>To do List</h1>
      {<h1>Usuario: {user.name}</h1>}
      <input type="text" /*value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask(inputValue)}*/
        placeholder="¿Cual es la tarea a realizar?"
      />
      <ul>
        {todos.length === 0 ? (
          <li className="task-item">No hay tareas registradas</li>
        ) : (
          todos.map((item) => (
            <li key={id} className="task-item">
              {item.label}
              <button className="delete-button" /*onClick={() => removeTask(index)}*/>X</button>
            </li>
          ))
        )}
      </ul>
    </div>

  )

}

export default ToDoList;