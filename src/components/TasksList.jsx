import { useState, useEffect, useReducer } from "react";

//caricamento dei task salvati in localStorage
const initialTasks = () => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
};

//funzione reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "TOGGLE":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case "REMOVE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state; //se non viene riconosciuto il tipo di azione, restituisco lo stato attuale
  }
};


const TasksList = () => {
  const [input, setInput] = useState("");
  const [tasks, dispatch] = useReducer(reducer, [], initialTasks); //dispatch invia l'azione al reducer per gestire lo stato
  const [error, setError] = useState("");

//salvo sul localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

//funzione per aggiungere un task
  const addTask = () => {
    if (input.trim() === "") {
      setError("⚠️Inserisci un'attività!");
      return;
    }
    dispatch({ type: "ADD", payload: input });
    setInput("");
    setError("");
  };

//messaggio per il completamento
const allTasks = tasks.length > 0 && tasks.every((task) => task.completed); 
  

  return (
    <div className="container text-center">
      <h2 className="mb-3">📋Le tue attività</h2>
      {/* input aggiungi */}
      <div className="task-input-wrapper">
      <input type="text" className="input-task" placeholder="Inserisci una nuova attività" value={input}
        onChange={(e) => setInput(e.target.value)}/>
      <button onClick={addTask} className="btn">➕ Aggiungi</button>
      </div>
      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
      {/* tasks + bottone rimuovi */}
      {allTasks ? (
        <h5 className="mt-4">🎉Hai completato tutte le attività!</h5>  
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <input type="checkbox" checked={task.completed} className="my-3"
                onChange={() => dispatch({ type: "TOGGLE", payload: task.id })}/>
              <span className={`task-text ${task.completed ? "task-completed" : ""}`}>
                {task.text}
              </span>
              <button onClick={() => dispatch({ type: "REMOVE", payload: task.id })} className="btn">➖ Rimuovi</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;
