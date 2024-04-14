import { v4 as uuid } from 'uuid'

export function getTodos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(
                [
                    {
                        id: uuid(),
                        text: 'Todo',
                        done: false
                    },
                    {
                        id: uuid(),
                        text: 'Todo',
                        done: true
                    },
                    {
                        id: uuid(),
                        text: 'Todo',
                        done: true
                    }
                ]
            )
        }, 1000)
    })
}