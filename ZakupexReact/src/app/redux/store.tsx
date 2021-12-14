import { configureStore } from "@reduxjs/toolkit"
import listReducer from "./listReducer";
import userReducer from './userReducer';

const store = configureStore({
    reducer: {
        listStore: listReducer,
        userStore: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
