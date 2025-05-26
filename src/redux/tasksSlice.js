import { createSlice } from "@reduxjs/toolkit"; //create 

//IN QUESTO FILE SPOSTO LA LOGICA DELLE TASKS

//caricamento dei task salvati in localStorage
const initialTasks = () => {
  const saved = localStorage.getItem("tasks"); //recupero i task salvati (se esistono)
  return saved ? JSON.parse(saved) : []; //se esistono, converto da stringa ad array, altrimenti restituisco un array vuoto
};

const tasksSlice = createSlice({ //createSlice è una funzione che semplifica la creazione di uno slice di stato
    name: "tasks",  //nome dello slice, serve per identificare questa parte dello stato globale
    initialState: initialTasks(), //stato iniziale, caricato da localStorage
    reducers: { //oggetto che contiene tutte le funzioni che modificano lo stato

        //aggiunge una nuova task
        addTask: (state, action) => {
            state.push({
                id: Date.now(), //id univoco basato sul timestamp corrente
                text: action.payload, //testo della task passato come payload
                completed: false, //la nuova task non è completata
            });
        },

        //cambia lo stato di completamento di una task
        toggleTask: (state, action) => {
            const task = state.find(curItem => curItem.id === action.payload); //find cerca la task con l'id specificato
            //se la task esiste, cambio lo stato di completamento
            if (task) {
                task.completed = !task.completed;
            }
        },

        //rimuove una task
        removeTask: (state, action) => {
            return state.filter(curItem => curItem.id !== action.payload); //filter restituisce tutte le task tranne quella con l'id specificato
        }
    }
})

//esporto le azioni per poterle usare nei componenti
export const { addTask, toggleTask, removeTask} = tasksSlice.actions;

//esporto il reducer per poterlo usare nello store
export default tasksSlice.reducer;