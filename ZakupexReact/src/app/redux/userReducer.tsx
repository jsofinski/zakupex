import { createAsyncThunk, createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit"
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { updateLists } from "./listReducer"


export type UserSliceState = {
    uid: null | string,
    username: null | string
}

const initialState: UserSliceState = {
    uid: null,
    username: null
}

export const updateUser = createAsyncThunk(
    'userStore/updateUser',
    async (arg, thunkAPI) => {
        const user = auth().currentUser;
        if (user == null) {
            thunkAPI.dispatch(updateLists())
            return initialState;
        } else {
            const snapshot = await database().ref(`users/${user.uid}/nickname`).once('value');
            const response : UserSliceState = {
                uid: user.uid,
                username: snapshot.val()
            }
            thunkAPI.dispatch(updateLists())
            return response;
        }
    }
);

export const logout = createAsyncThunk(
    'userStore/logout',
    async (state, thunkAPI)=>{
        await auth().signOut();
        thunkAPI.dispatch(updateUser());
    }
);

export const login = createAsyncThunk( 
    'userStore/login',
    async (action: { email: string, password: string, onSuccess: ()=>any, onError: (message: string)=>any }, thunkAPI) => {
        try{
            await auth().signInWithEmailAndPassword(action.email, action.password);
            thunkAPI.dispatch(updateUser());
            action.onSuccess();
        }catch(error){
            action.onError(error instanceof Error ? error.message : "Unknown error");
        }
    }
);

export const register = createAsyncThunk( 
    'userStore/register',
    async (action: { email: string, password: string, nickname: string, onSuccess: ()=>any, onError: (message: string)=>any }, thunkAPI) => {
        try{
            const userCredential = await auth().createUserWithEmailAndPassword(action.email, action.password);
            await database().ref(`users/${userCredential.user.uid}`).set({'nickname': action.nickname});
            await database().ref(`nicknames/${action.nickname}/${userCredential.user.uid}`).set(true);
            thunkAPI.dispatch(updateUser());
            action.onSuccess();
        }catch(error){
            action.onError(error instanceof Error ? error.message : "Unknown error");
        }
    }
);

export const userSlice = createSlice({
    name: "userStore",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
        })
    }
});

export default userSlice.reducer;