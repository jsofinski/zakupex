import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { RootState } from "./store";
import ListHandler, { ListOptions } from "../utilities/listHandler";



export type ListItem = {
    id: string,
    name: string,
    quantity: string,
    icon: string
}

export type List = {
    id: string,
    name: string,
    privileges: string,
    reference: string,
    items: Array<ListItem>
}

export type ListSliceState = {
    lists: Array<List>
}

const initialState: ListSliceState = {
    lists: []
}

const setList = createAction<List>('setList');
const removeAllLists = createAction<void>('setInitial')

export const updateLists = createAsyncThunk<
    void,
    void,
    { state: RootState }
>(
    'listStore/updateLists',
    async (arg, thunkAPI) => {
        const user = auth().currentUser;
        if (user == null) {
            thunkAPI.dispatch(removeAllLists());
            return;
        }

        const uid = user.uid;
        const snapshot = await database().ref(`users/${uid}/lists`).once('value');

        let listPaths: Array<{ uid: string, lid: string }> = [];
        let currentLists = thunkAPI.getState().listStore.lists;
        snapshot.forEach((child) => {
            if (child.key != null && !currentLists.some((list) => { return list.id == child.key })) {
                listPaths.push({ uid: child.val(), lid: child.key });
            }
            return undefined;
        });
        for (let path of listPaths) {
            let ref = database().ref(`lists/${path.uid}/${path.lid}`);
            let priv = await ref.child(`users/${uid}/privileges`).once('value');
            if (priv.exists()) {
                let hook = ref.on('value', (snapshot) => {
                    var items: Array<ListItem> = [];
                    snapshot.child('entries').forEach((item) => {
                        if (item.key == null) return undefined;
                        items.push({
                            id: item.key,
                            name: item.child('name').val(),
                            quantity: item.child('quantity').val(),
                            icon: item.child('icon').val()
                        });
                        return undefined;
                    })
                    let payload: List = {
                        id: path.lid,
                        name: snapshot.child('name').val(),
                        privileges: snapshot.child(`users/${uid}/privileges`).val(),
                        reference: `lists/${path.uid}/${path.lid}`,
                        items: items
                    }
                    thunkAPI.dispatch(setList(payload));

                });
                ListHandler.getHandler().registerHook(path.lid, () => ref.off('value', hook));
            } else {
                await database().ref(`users/${uid}/lists/${path.lid}`).remove();
            }
        };
    }
);

export const newList = createAsyncThunk(
    'listStore/newList',
    async (options: ListOptions, thunkApi) => {
        await ListHandler.getHandler().createNewList(options);
        thunkApi.dispatch(updateLists());
    }
);


export const addUserToList = createAsyncThunk<
    {},
    { list: string, user: string },
    { state: RootState }
>(
    'listStore/addUserToList',
    async (arg: { list: string, user: string }, thunkApi) => {
        let list = thunkApi.getState().listStore.lists.find((el) => el.id == arg.list);
        if (list == null) return;
        if (list.privileges != 'full') return;
        database().ref(list.reference).child(`users/${arg.user}`).set({
            privileges: 'modify'
        })
    }
);

export const removeUserFromList = createAsyncThunk<
    {},
    { list: string, user: string },
    { state: RootState }
>(
    'listStore/removeUserFromList',
    async (arg: { list: string, user: string }, thunkApi) => {
        let list = thunkApi.getState().listStore.lists.find((el) => el.id == arg.list);
        if (list == null) return;
        if (list.privileges != 'full') return;
        database().ref(list.reference).child(`users/${arg.user}`).remove()
    }
);

export const renameList = createAsyncThunk<
    void,
    { id: string, name: String },
    { state: RootState }
>(
    'listStore/renameList',
    async (arg, thunkApi) => {
        let list = thunkApi.getState().listStore.lists.find((el) => el.id == arg.id);
        if (list != undefined) {
            let ref = list.reference
            database().ref(ref).child('name').set(arg.name);
        }
    }
);

export const removeList = createAsyncThunk<
    {},
    string,
    { state: RootState }
>(
    'listStore/removeList',
    async (id, thunkApi) => {
        const user = auth().currentUser;
        if (user == null) {
            return;
        }
        const uid = user.uid;

        const list = thunkApi.getState().listStore.lists.find((el) => el.id == id);
        if (list == undefined) return;

        if (list.privileges == 'full') {
            await database().ref(list.reference).remove();
        } else {
            console.log('missing privileges');
        }
    }
);

export const addItem = createAsyncThunk<
    void,
    { listid: string, item: ListItem },
    { state: RootState }
>(
    'listStore/addItem',
    async (arg, thunkApi) => {
        let ref = thunkApi.getState().listStore.lists.find((el) => el.id == arg.listid)?.reference
        if (ref != undefined) {
            database().ref(ref).child('entries').push({
                name: arg.item.name,
                quantity: arg.item.quantity,
                icon: arg.item.icon
            });
        }
    }
)

export const modifyItem = createAsyncThunk<
    void,
    { listid: string, item: ListItem },
    { state: RootState }
>(
    'listStore/modifyItem',
    async (arg, thunkApi) => {
        let list = thunkApi.getState().listStore.lists.find((el) => el.id == arg.listid);
        if (list == undefined) return;
        let item = list.items.find((it) => it.id == arg.item.id);
        if (item == undefined) return;

        database().ref(list.reference).child(`entries/${arg.item.id}`).set({
            name: arg.item.name,
            quantity: arg.item.quantity,
            icon: arg.item.icon
        });
    }
)

export const removeItem = createAsyncThunk<
    void,
    { listid: string, itemid: string },
    { state: RootState }
>(
    'listStore/removeItem',
    async (arg, thunkApi) => {
        let list = thunkApi.getState().listStore.lists.find((el) => el.id == arg.listid);
        if (list == undefined) return;
        let item = list.items.find((it) => it.id == arg.itemid);
        if (item == undefined) return;

        database().ref(list.reference).child(`entries/${arg.itemid}`).remove()
    }
)

export const listSlice = createSlice({
    name: "listStore",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setList, (state, action) => {
                if (action.payload.privileges == null) {
                    ListHandler.getHandler().removeListener(action.payload.id);
                    let index = state.lists.findIndex((list) => list.id == action.payload.id)
                    if (index != -1) state.lists.splice(index, 1)
                } else {
                    let index = state.lists.findIndex((list) => list.id == action.payload.id)
                    if (index == -1) {
                        state.lists.push(action.payload)
                    } else {
                        state.lists[index] = action.payload
                    }
                }
            })
            .addCase(removeAllLists, (state, action) => {
                state.lists = []
            })
    }
});

export default listSlice.reducer;
