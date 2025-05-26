import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTask, removeTask } from "../redux/tasksSlice";


const TasksList = () => {
  const [input, setInput] = useState(""); //stato per il valore dell'input
  const [error, setError] = useState(""); //stato per gli errori

  const tasks = useSelector((state) => state.tasks); //prendo lo stato delle tasks da Redux
  const dispatch = useDispatch(); //prendo la funzione per inviare le azioni

//salvo sul localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
     //ogni volta che cambia, aggiorna il valore in localStorage
  }, [tasks]);

//funzione per aggiungere un task
  const addHandleTask = () => {
    if (input.trim() === "") { //trim rimuove gli spazi vuoti all'inizio e alle fine
      setError("⚠️Inserisci un'attività!"); //se l'input è vuoto, mostra un messaggio di errore
      return;
    }
    dispatch(addTask(input)); //invio l'azione per aggiungere il task
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
      <button onClick={addHandleTask} className="btn">➕ Aggiungi</button>
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
                onChange={() => dispatch(toggleTask(task.id))}/> 
                {/* cambia lo stato di completamento al click */}
              <span className={`task-text ${task.completed ? "task-completed" : ""}`}>
                {task.text}
              </span>
              {/* al click del bottone, invia l'azione con l'id del task */}
              <button onClick={() => dispatch(removeTask(task.id))} className="btn">➖ Rimuovi</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;
