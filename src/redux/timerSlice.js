import { createSlice } from "@reduxjs/toolkit";

//IN QUESTO FILE SPOSTO LA LOGICA DEL TIMER

const timerSlice = createSlice({
    name: "timer",
    initialState: 0, //stato iniziale a 0
    reducers: {
        increment: state => state + 1,
        set: (_, action) => action.payload,
    },
});

//esporto le azioni per poterle usare nei componenti
export const { increment, set } = timerSlice.actions;

//esporto il reducer per poterlo usare nello store
export default timerSlice.reducer;
