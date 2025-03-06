import {create, StateCreator} from 'zustand';
import { persist } from 'zustand/middleware';
export interface ListItem {
    id: string,
    status: 'todo' | 'done',
    content: string
}

type State = {
    list: Array<ListItem>
}

type Action = {
    addItem: (item: ListItem, preId?: string) => void,
    deleteItem: (id: string) => void,
    updateItem: (item: ListItem) => void,
    sortItem: (id1: string, id2: string) => void,
}

const stateCreator: StateCreator<State & Action> = (set) => ({
    list: [],
    addItem: (item: ListItem, preId?: string) => {
        set((state) => {
            const index = state.list.findIndex(i => i.id == preId);
            if (preId) {
                state.list.splice(index + 1, 0, item)
                console.log(state.list)
                return {
                    list: [...state.list]
                }
            }

            return {
                list: [
                    ...state.list,
                    item
                ]
            }

        })
    },
    deleteItem: (id: string) => {
        set((state) => {
            return {
                list: state.list.filter(item => {
                    return item.id !== id;
                })
            }
        });
    },
    updateItem: (updateItem: ListItem) => {
        set(state => {
            return {
                list: state.list.map(item => {
                    if (item.id === updateItem.id) {
                        return updateItem;
                    }
                    return item;
                })
            }
        })
    },
    sortItem: (id1: string, id2: string) => {
        set((state) => {
            const index1 = state.list.findIndex(item => item.id == id1)
            const index2 = state.list.findIndex(item => item.id == id2)
            console.log(index1, index2)
            const temp = state.list[index1]
            state.list[index1] = state.list[index2]
            state.list[index2] = temp
            return {
                list: [...state.list],
            }
        })
    }
})
export const useTodoListStore = create<State & Action>()(persist(stateCreator, {
    name: 'todolist'
}));