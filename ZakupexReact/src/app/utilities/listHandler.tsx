import auth from '@react-native-firebase/auth'
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database'
import { ListItem } from '../redux/listReducer';


export type ListOptions = {
    name: string,
    users: Array<string>,
}

export default class ListHandler {
    static instance: ListHandler | null;

    hooks: Array<{ id: string, release: () => void }> = [];

    static getHandler() {
        if (this.instance == null)
            this.instance = new ListHandler();
        return this.instance;
    }

    removeListener(lid: string) {
        let index = this.hooks.findIndex((hook) => lid == hook.id)
        if (index != -1) {
            this.hooks[index].release();
            this.hooks.splice(index, 1)
        }
    }

    registerHook(lid: string, release: () => void) {
        this.hooks.push({ id: lid, release: release });
    }

    async createNewList(options: ListOptions) {
        
        const user = auth().currentUser;
        if (user == null) {
            return
        }
        const uid = user.uid;

        let cell: { [key: string]: any } = {};
        cell['name'] = options.name
        cell['users'] = {}
        for(let usr of options.users){
            cell['users'][usr] = {};
            cell['users'][usr]['privileges'] = 'modify';
        }
        cell['users'][uid] = {};
        cell['users'][uid]['privileges'] = 'full';


        const ref = database().ref(`lists/${uid}`).push(cell);
        await database().ref(`users/${uid}/lists/${ref.key}`).set(uid);
        
        for(let usr of options.users){
            await database().ref(`users/${usr}/requests/${uid}`).push({
                type: 'list_inv',
                uid: uid,
                lid: ref.key
            });
        }
    }

    addCosts(oid: string, lid: string, description: string, costs: number) {
        const user = auth().currentUser;
        if (user == null) {
            return
        }
        const uid = user.uid;

        database().ref(`lists/${oid}/${lid}/costs`).push({
            user: uid,
            costs: costs,
            description: description
        });
    }

    async settleList(oid: string, lid: string) {
        const cuser = auth().currentUser;
        if (cuser == null) {
            return
        }
        const uid = cuser.uid;

        let usersSnapshot = await database().ref(`lists/${oid}/${lid}/users`).once('value')
        let users: Array<string> = []
        usersSnapshot.forEach((user) => {
            if (user.key != null) users.push(user.key)
            return undefined;
        });
        let listName = await (await database().ref(`lists/${oid}/${lid}/name`).once('value')).val();
        let costs = await database().ref(`lists/${oid}/${lid}/costs`).once('value');

        let to_write : Array<{ref: FirebaseDatabaseTypes.Reference, value: any}> = [];
        costs.forEach((entry) => {
            let cost = entry.child('costs').val()/(users.length-1);
            for(let user of users){
                if(user != entry.child('user').val()){
                    to_write.push({
                        ref: database().ref(`users/${user}/requests/${uid}`),
                        value: {
                            type: 'cost_log_owe',
                            uid: entry.child('user').val(),
                            list: listName,
                            description: entry.child('description').val(),
                            cost: cost.toString()
                        }
                    })
                }else{
                    to_write.push({
                        ref: database().ref(`users/${entry.child('user').val()}/requests/${uid}`),
                        value: {
                            type: 'cost_log_paid',
                            uid: user,
                            list: listName,
                            description: entry.child('description').val(),
                            cost: cost.toString()
                        }
                    })
                }
            }
            return undefined;
        });
        for(let entry of to_write){
            const ref = await entry.ref.push();
            await ref.set(entry.value);
        }

    }
    
}
