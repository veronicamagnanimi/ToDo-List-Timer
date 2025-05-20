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

//salvo sul localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

//funzione per aggiungere un task
  const addTask = () => {
    if (input.trim() === "") return;
    dispatch({ type: "ADD", payload: input });
    setInput("");
  };

//messaggio per il completamento
const allTasks = tasks.every((task) => task.completed); 
  

  return (
    <div className="container mt-4 py-3 gradient-bg text-center">
      <h2>📋Le tue attività</h2>

      <input type="text" className="my-3" placeholder="Nuova attività" value={input}
        onChange={(e) => setInput(e.target.value)}/>
      <button onClick={addTask}>Aggiungi</button>

      {allTasks ? (
        <p>🎉Hai completato tutte le attività!</p>  
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <input type="checkbox" checked={task.completed}
                onChange={() => dispatch({ type: "TOGGLE", payload: task.id })}/>
              <span className={`task-text ${task.completed ? "task-completed" : ""}`}>
                {task.text}
              </span>
              <button onClick={() => dispatch({ type: "REMOVE", payload: task.id })}>Rimuovi</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;
