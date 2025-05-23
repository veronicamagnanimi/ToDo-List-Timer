import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";
import timerSlice from "./timerSlice";

const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        timer: timerSlice,
    },
});


export default store;