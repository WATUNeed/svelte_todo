import { derived } from 'svelte/store'
import { tasksStorage } from './tasksStorage'

export const tasksInfoStorage = derived(
    [tasksStorage], 
    ([tasksStorage]) => {
        const tasksCompleted = tasksStorage.filter(item => item.tasksCompleted)
        const tasksActive = tasksStorage.filter(item => !item.tasksCompleted)
        const tasksTotalCount = tasksStorage.length
        return {
            tasksCompleted,
            tasksActive,
            tasksTotalCount,
        }
    }
);
