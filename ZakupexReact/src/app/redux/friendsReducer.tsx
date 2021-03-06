import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { RootState } from "./store";
import ListHandler from "../utilities/listHandler";

export type Friend = {
    id: string,
    name: string
    owe: number
}

export type FriendRequest = {
    id: string,
    name: string,
    path: string
}

export type OweLog = {
    list: string,
    type: string,
    description: string,
    cost: number
}

export type Backlog = {
    id: string,
    log: Array<OweLog>
}

export type FriendsSliceState = {
    friends: Array<Friend>,
    requests: Array<FriendRequest>,
    querry: Array<Friend>,
    friendOwe: Array<Backlog>
}

//const rawList = useSelector((state: RootState)=> state.friendsStrore.friendOwe.find((el)=>el.id == route.params.id)?.log);
//const list = rawList==undefined ? [] : rawList;

const initialState: FriendsSliceState = {
    friends: [],
    requests: [],
    querry: [],
    friendOwe: []
}


export const updateFriendRequests = createAsyncThunk(
    'firendsStore/updateFriendRequests',
    async (arg, thunkApi) => {
        const user = auth().currentUser;
        if (user == null) {
            return [];
        }
        const uid = user.uid;

        let requests: Array<FriendRequest> = [];
        const snapshot = await database().ref(`users/${uid}/requests`).once('value');
        snapshot.forEach((user) => {
            user.forEach((request) => {
                if (request.child('type').val() == 'friend_inv' && user.key != null) {
                    if(!requests.some((el)=>el.id == user.key)){
                        requests.push({
                            id: user.key,
                            name: request.child('nick').val(),
                            path: `users/${uid}/requests/${user.key}/${request.key}`
                        });  
                    }
                }
                return undefined;
            });
            return undefined;
        });
        let n = requests.length;
        for(let i=0; i<n;){
            if((await database().ref(`users/${uid}/friends`).once('value')).hasChild(requests[i].id)){
                await database().ref(requests[i].path).remove();
                requests.splice(i,1);
                n--;
            }else{
                i++
            }
        }
        return requests;
    }
)

export const acceptFriendRequest = createAsyncThunk<
    string | null,
    FriendRequest,
    { state: RootState }
>(
    'fiendsStore/acceptFriendRequest',
    async (request, thunkApi) => {
        const user = auth().currentUser;
        if (user == null) {
            return null;
        }
        const uid = user.uid;

        if (thunkApi.getState().friendsStrore.requests
            .some((el) =>
                el.id == request.id &&
                el.name == request.name &&
                el.path == request.path
            )
        ) {
            database().ref(request.path).remove();
            await database().ref(`users/${uid}/friends/${request.id}`).set({
                nick: request.name,
                owe: 0
            });
            thunkApi.dispatch(upadateFriends());
            return request.id;
        }
        return null;
    }
)

export const declineFriendRequest = createAsyncThunk<
    string | null,
    FriendRequest,
    { state: RootState }
>(
    'fiendsStore/declineFriendRequest',
    async (request: FriendRequest, thunkApi) => {
        if (thunkApi.getState().friendsStrore.requests
            .some((el) =>
                el.id == request.id &&
                el.name == request.name &&
                el.path == request.path
            )
        ) {
            database().ref(request.path).remove();
            return request.id;
        }
        return null;
    }
)


export const addFriend = createAsyncThunk<
    void,
    Friend,
    { state: RootState }
>(
    'fiendsStore/addFriend',
    async (friend, thunkApi) => {
        const uid = thunkApi.getState().userStore.uid
        const username = thunkApi.getState().userStore.username;
        if (uid == null || username == null ) {
            return;
        }
        

        if (!thunkApi.getState().friendsStrore.friends.some((el) => el.id == friend.id)) {
            await database().ref(`users/${uid}/friends/${friend.id}`).set({
                nick: friend.name,
                owe: 0
            });
            database().ref(`users/${friend.id}/requests/${uid}`).push({
                type: 'friend_inv',
                nick: username
            });
            thunkApi.dispatch(upadateFriends());
        }
        return;
    }
)

export const upadateFriends = createAsyncThunk(
    'fiendsStore/updateFriends',
    async (arg, thunkApi) => {
        const user = auth().currentUser;
        if (user == null) {
            return [];
        }
        const uid = user.uid;

        await ListHandler.getHandler().handleOweLogRequests();

        let friends: Array<Friend> = [];
        let logs: Array<Backlog> = [];
        const snapshot = await database().ref(`users/${uid}/friends`).once('value');
        snapshot.forEach((friend) => {
            if (friend.key != null) {
                friends.push({
                    id: friend.key,
                    name: friend.child('nick').val(),
                    owe: friend.child('owe').val()
                });
                let log : Array<OweLog> = []
                friend.child('log').forEach((logItem)=>{
                    log.push({
                        list: logItem.child('list').val(),
                        type: logItem.child('type').val(),
                        description: logItem.child('description').val(),
                        cost: logItem.child('amount').val()
                    });
                });
                logs.push({
                    id: friend.key,
                    log: log
                });
            }
            return undefined;
        });
        return {friends: friends, logs: logs};
    }
)

export const querryFriends = createAsyncThunk(
    'fiendsStore/querryFriends',
    async (name: string|null) => {
        if(name == null) return [];
        let users = await database().ref(`nicknames/${name}`).once('value');
        let result: Array<Friend> = [];
        users.forEach((user) => {
            if (user.key != null) {
                result.push({
                    id: user.key,
                    name: name,
                    owe: 0
                });
            }
            return undefined;
        })
        return result;
    }
)


export const firendsSlice = createSlice({
    name: "friendsStore",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateFriendRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
            })
            .addCase(upadateFriends.fulfilled, (state, action) => {
                state.friends = action.payload.friends;
                state.friendOwe = action.payload.logs;
            })
            .addCase(acceptFriendRequest.fulfilled, (state, action) => {
                if (action.payload != null) {
                    let index = state.requests.findIndex((el) => el.id == action.payload);
                    state.requests.splice(index, 1);
                }
            })
            .addCase(declineFriendRequest.fulfilled, (state, action) => {
                if (action.payload != null) {
                    let index = state.requests.findIndex((el) => el.id == action.payload);
                    state.requests.splice(index, 1);
                }
            })
            .addCase(querryFriends.fulfilled, (state, action) => {
                state.querry = action.payload;
            })
    }
});

export default firendsSlice.reducer;