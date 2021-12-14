import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
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
}
