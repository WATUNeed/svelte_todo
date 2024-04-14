<script>
    import { crossfade } from 'svelte/transition'
	import { cubicIn } from 'svelte/easing'
    import { flip } from 'svelte/animate';

	import TaskItem from './TaskItem.svelte';

	import { tasksStorage } from '../store/tasksStorage'

    export let tasks

    const [ send, receive ] = crossfade({
		duration: 400,
		fallback(node, params) {
			const style = getComputedStyle(node)
			const transform = style.transform === 'none' ? '': style.transform

			return {
				duration: 400,
				easing: cubicIn,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t};
				`
			}
		}
	})

    function handleTaskCompletedChange(id, taskCompleted) {
		tasksStorage.updateCompleted({id, taskCompleted})
	}

	function handleTeskRemove(id) {
		tasksStorage.remove(id)
	}
</script>

<div class="tasks-container">
    {#each tasks as task (task.id)}
        <div 
            class="task-item-container"
            in:receive="{{ key: task.id }}"
            out:send="{{ key: task.id }}"
            animate:flip="{{ duration: 500 }}"
        >
            <TaskItem 
                title={task.title}
                taskCompleted={task.taskCompleted}
                on:taskCompletedChange={(event) => handleTaskCompletedChange(
                    task.id, 
                    event.detail
                )}
                on:taskRemove={() => handleTeskRemove(task.id)}
            />
        </div>
    {/each}
</div>

<style>
	.tasks-container {
        flex: 1;
		padding: 5px;
		box-sizing: border-box;
	}

	.task-item-container {
		margin-bottom: 5px;
		margin-top: 5px;
	}
</style>