import { createSlice } from "@reduxjs/toolkit";

//IN QUESTO FILE SPOSTO LA LOGICA DEL TIMER

const timerSlice = createSlice({
    name: "timer", //nome dello slice
    initialState: 0, //stato iniziale a 0
    reducers: { //oggetto che contiene tutte le funzioni che modificano lo stato
        increment: state => state + 1, //incrementa il valore del timer di 1
        set: (_, action) => action.payload, //imposta il timer a un valore specifico passato nell'azione
    },
});

//esporto le azioni per poterle usare nei componenti
export const { increment, set } = timerSlice.actions;

//esporto il reducer per poterlo usare nello store
export default timerSlice.reducer;
