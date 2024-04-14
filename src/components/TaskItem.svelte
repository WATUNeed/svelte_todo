<script>
    import { createEventDispatcher } from "svelte"
    import { draggable } from '../actions/draggable'

    export let title
    export let taskCompleted

    const dispatch = createEventDispatcher()

    function handleRemoveTaskClick() {
        dispatch('taskRemove')
    }

    function handleTaskCompletedChange(event) {
        dispatch('taskCompletedChange', event.target.checked)
    }

    let coords = { x: 0, y: 0}
    function handlerDragStart() {

    }

    function handlerDragMove(event) {
        coords = {
            x: coords.x + event.detail.dx,
            y: coords.y + event.detail.dy
        }
    }

    function handlerDragEnd() {
        coords = { x: 0, y: 0}
    }

</script>


<div 
    class="main-container"
    style="
        transform: translate({coords.x}px, {coords.y}px);
    "
    use:draggable
    on:dragstart={ handlerDragStart }
    on:dragmove={ handlerDragMove }
    on:dragend={ handlerDragEnd }
>
    <div 
        class="task-container"
        style="
            background-color: {taskCompleted? '#64ad80' : '#faf792'};
        "
    >
        <input 
            class="task-completed-checkbox"
            checked={taskCompleted}
            type="checkbox" 
            on:input={ handleTaskCompletedChange }
            bind:value={ taskCompleted }
        >

        <p class="task-title">{ title }</p>

        <button 
            class="remove-task-button"
            on:click={ handleRemoveTaskClick }
        >
            <img 
                class="remove-icon" 
                src='/remove.png' 
                alt="Delete task."
                width='25' 
                height='25'
            >
        </button>
        
    </div>
</div>


<style>
    .main-container {
        position: relative;
        height: 50px;
        width: 100%;
        user-select: none;
        cursor: pointer;
    }

    .task-container {
        display: flex;
        align-items: center;
        justify-items: baseline;

        border-radius: 5px;
        background-color: darkseagreen;
        padding: 0 10px;
        box-sizing: border-box;
    }

    .task-completed-checkbox {
        transform: scale(1.2);
        margin: 0;
        margin-right: 20px;
        width: 10%;
        height: 100%;
        cursor: pointer;
    }

    .task-title {
        width: 80%;
        height: 100%;
        overflow: hidden;
        display: -webkit-box;
        line-clamp: 1; 
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .remove-task-button {
        width: 10%;
        min-width: 40px;
        height: 100%;
        cursor: pointer;
        margin: 0px;
        border: none;
        background: none;
        background-color: none;
    }

    .remove-task-button:hover {
        background: none;
        background-color: none;
    }

    .remove-task-button:hover {
        transform: scale(1.1);
    }
</style>