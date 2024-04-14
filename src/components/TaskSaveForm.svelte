<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()

    let title = ""
    let description = ""

    function handleSaveTaskClick() {
        dispatch('taskSaveEvent', {
            title,
            description
        })
    }

</script>

<div class="task-container">
    <span>Create new task</span>
    <input 
        class="task-title-input" 
        placeholder="Title"
        bind:value={ title } 
    />

    <textarea 
        class="task-description-input" 
        placeholder="Description"
        bind:value={ description } 
    />

    <div class="button-container">
        <button 
            class="save-button" 
            on:click={ handleSaveTaskClick }
        >Save</button>
    </div>
</div>


<style>
    .task-container {
        background-color: aquamarine;
        border-radius: 5px;
        padding: 10px;
    }

    .task-title-input {
        width: 100%;
        min-height: max-content;
    }

    .task-description-input {
        width: 100%;
        resize: vertical;
        min-height: 100px;
    }

    .button-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .save-button {
        cursor: pointer;
		
    }
</style>