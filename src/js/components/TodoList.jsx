import React, { useState, useEffect } from "react";

const TodoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    
    
    const user = "frank_gre_2026";
    const baseUrl = `https://playground.4geeks.com/todo`;

 
    const getTasks = () => {
        fetch(`${baseUrl}/users/${user}`)
            .then(resp => {
                if (resp.status === 404) {
                    
                    createUser();
                }
                return resp.json();
            })
            .then(data => {
                if (data.todos) setTodos(data.todos);
            })
            .catch(error => console.error("Error en GET:", error));
    };

    
    const createUser = () => {
        fetch(`${baseUrl}/users/${user}`, { method: "POST" })
            .then(() => getTasks())
            .catch(error => console.error("Error creando usuario:", error));
    };

    
    const addTask = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const newTask = { label: inputValue, is_done: false };

            fetch(`${baseUrl}/todos/${user}`, {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: { "Content-Type": "application/json" }
            })
            .then(resp => {
                if (resp.ok) {
                    setInputValue("");
                    getTasks(); 
                }
            })
            .catch(error => console.error("Error en POST:", error));
        }
    };

    
    const deleteTask = (id) => {
        fetch(`${baseUrl}/todos/${id}`, { method: "DELETE" })
            .then(resp => {
                if (resp.ok) getTasks(); 
            })
            .catch(error => console.error("Error en DELETE:", error));
    };

    
    const clearAll = () => {
        fetch(`${baseUrl}/users/${user}`, { method: "DELETE" })
            .then(resp => {
                if (resp.ok) {
                    setTodos([]);
                    createUser();
                }
            })
            .catch(error => console.error("Error limpiando todo:", error));
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h1 className="text-center display-2 opacity-25">todos</h1>
            <div className="shadow bg-white rounded overflow-hidden">
                <input
                    type="text"
                    className="form-control border-0 p-3 fs-4"
                    placeholder="¿Qué falta por hacer?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={addTask}
                />
                <ul className="list-group list-group-flush">
                    {todos.length === 0 ? (
                        <li className="list-group-item text-muted small">No hay tareas, añade una.</li>
                    ) : (
                        todos.map((t) => (
                            <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center task-item">
                                {t.label}
                                <button 
                                    className="btn-close small" 
                                    onClick={() => deleteTask(t.id)}
                                ></button>
                            </li>
                        ))
                    )}
                </ul>
                <div className="p-2 d-flex justify-content-between bg-light align-items-center border-top">
                    <small className="text-muted">{todos.length} items left</small>
                    <button className="btn btn-sm btn-outline-danger border-0" onClick={clearAll}>
                        Limpiar lista
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;