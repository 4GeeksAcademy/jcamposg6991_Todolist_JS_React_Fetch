import React, { useState, useEffect } from "react";

const Personajes = () => {

    const [personajes, setPersonajes] = useState([])

    function obtenerPersonajes() {

        return fetch("https://rickandmortyapi.com/api/character", { method: "GET" })

            .then(response => response.json())

            .then((data) => setPersonajes(data.results))

            .catch((error) => console.log(error))

    }

    useEffect(() => {

        obtenerPersonajes()

    }, [])



    return (
        <div className="text-center">
            <h1>Personajes:</h1>
            <ul>
                {personajes.map((item, index) => (
                    <li key={index}>{item.name} - {item.species}</li>
                ))}
            </ul>
        </div>
    )
}

export default Personajes;