import { writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

function createTasksStore() {
    const { subscribe, update } = writable([])

    return {
        subscribe,

        add: ({
            title,
            description
        }) => {
            update((tasks) => {
                return [...tasks, {
                    id: uuid(),
                    title,
                    description,
                    taskCompleted: false
                }]
            })
        },

        updateCompleted: ({
            id, 
            taskCompleted
        }) => {
            update(tasks => {
                return tasks.map(task => {
                    if (task.id === id) {
                        return {
                            ...task,
                            taskCompleted
                        }
                    }
                    else {
                        return task
                    }
                })
            })
        },

        remove: ({
            id
        }) => {
            update(tasks => {
                return tasks.filter(task => {
                    return task.id !== id
                })
            })
        },
    }
}

export const tasksStorage = createTasksStore()
