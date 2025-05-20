import { useState, useEffect, useReducer } from "react";

//caricamento dei task salvati in localStorage
const initialTasks = () => {
  const saved = localStorage.getItem("tasks"); //recupero i task salvati (se esistono)
  return saved ? JSON.parse(saved) : []; //se esistono, converto da stringa ad array, altrimenti restituisco un array vuoto
};

//funzione reducer
const reducer = (state, action) => { //gestisco le azioni per modificare lo stato
  switch (action.type) {
    case "ADD": //aggiungo un nuovo task
      return [
        ...state, //copio lo stato attuale
        //aggiungo un nuovo oggetto task con id unico, testo e completato
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "TOGGLE": //cambio lo stato di completamento
      return state.map((task) => //map restituisce un nuovo array
        task.id === action.payload //controllo se l'id del task corrisponde a quello passato nell'azione
          ? { ...task, completed: !task.completed } //se corrisponde, cambio lo stato di completamento
          : task //se l'id corrisponde, cambio lo stato di completamento
      );
    case "REMOVE": //rimuovo dalla lista
      return state.filter((task) => task.id !== action.payload); //filter restituisce un nuovo array senza il task rimosso
    default:
      return state; //se non viene riconosciuto il tipo di azione, restituisco lo stato attuale
  }
};


const TasksList = () => {
  const [input, setInput] = useState(""); //stato per il valore dell'input
  //stato per la lista, gestito dal reducer
  const [tasks, dispatch] = useReducer(reducer, [], initialTasks); //dispatch invia l'azione al reducer per gestire lo stato
  const [error, setError] = useState(""); //stato per gli errori

//salvo sul localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
     //ogni volta che cambia, aggiorna il valore in localStorage
  }, [tasks]);

//funzione per aggiungere un task
  const addTask = () => {
    if (input.trim() === "") { //trim rimuove gli spazi vuoti all'inizio e alle fine
      setError("⚠️Inserisci un'attività!"); //se l'input è vuoto, mostra un messaggio di errore
      return;
    }
    dispatch({ type: "ADD", payload: input }); //invia l'azione add con il testo dell'input
    setInput(""); //svuota il campo input
    setError(""); //rimuove il messaggio di errore
  };

//messaggio per il completamento
const allTasks = tasks.length > 0 && tasks.every((task) => task.completed); 
    //restituisce true solo se ci sono task e sono tutti completati

  return (
    <div className="container text-center">
      <h2 className="mb-3">📋Le tue attività</h2>

      {/* input aggiungi */}
      <div className="task-input-wrapper">
      <input type="text" className="input-task" placeholder="Inserisci una nuova attività" value={input}
        onChange={(e) => setInput(e.target.value)}/> 
        {/* aggiorna lo stato input quando l'utente scrive */}
      <button onClick={addTask} className="btn">➕ Aggiungi</button>
      {/* al click del bottone, chiama la funzione per aggiungere */}
      </div>

      {/* mostra il messaggio di errore se presente */}
      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

      {/* tasks + bottone rimuovi */}
      {allTasks ? (
        <h5 className="mt-4">🎉Hai completato tutte le attività!</h5> //mostra il messaggio se tutte le task sono completate
      ) : (
        <ul>
          {tasks.map((task) => (  //utilizzo map perchè restituisce un nuovo array con i task
            <li key={task.id} className="task-item">
              <input type="checkbox" checked={task.completed} className="my-3"
                onChange={() => dispatch({ type: "TOGGLE", payload: task.id })}/>
                {/* cambia lo stato di completamento al click */}
              <span className={`task-text ${task.completed ? "task-completed" : ""}`}>
                {task.text}
              </span>
              {/* al click del bottone, invia l'azione con l'id del task */}
              <button onClick={() => dispatch({ type: "REMOVE", payload: task.id })} className="btn">➖ Rimuovi</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;
