import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import timerSlice from "./timerSlice";

const store = configureStore({ //funzione di redux toolkit
    reducer: { //oggetto che contiene tutti i reducer (slice) da combinare nello store globale
        tasks: tasksSlice, //collego lo slice dei task allo stato globale sotto la chiave "tasks"
        timer: timerSlice, //collego lo slice del timer allo stato globale sotto la chiave "timer"
    },
});


export default store;