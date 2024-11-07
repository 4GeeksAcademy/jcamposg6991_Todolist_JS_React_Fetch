import React, { useState, useEffect } from "react";

const ToDoList = () => {

    const [user, setUser] = useState("")
    const [todos, setTodos] = useState([])

    function getUser() {
        return fetch("https://playground.4geeks.com/todo/users/jcamposg6991", { method: "GET" })
            .then(response => response.json())
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
              {todos.map((item, index) => (
                <li key={index} className="task-item">
                  {item.label}
                  <button className="delete-button" onClick={() => removeTask(index)}>X</button>
                </li>
              ))}
            </ul>
        </div>
  
    )

}

export default ToDoList;