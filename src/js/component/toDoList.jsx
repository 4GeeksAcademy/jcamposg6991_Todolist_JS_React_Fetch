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
        <div className="text-center">
            {<h1>{user.name}</h1>}
            <ul>
                {todos.map((item, index) => (
                    <li key={index}>{item.label}</li>
                ))}
            </ul>
        </div>
    )

}

export default ToDoList;