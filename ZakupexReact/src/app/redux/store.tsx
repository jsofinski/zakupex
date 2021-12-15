import { configureStore } from "@reduxjs/toolkit"
import listReducer from "./listReducer";
import userReducer from './userReducer';
import friendsReducer from './friendsReducer';

const store = configureStore({
    reducer: {
        listStore: listReducer,
        userStore: userReducer,
        friendsStrore: friendsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
