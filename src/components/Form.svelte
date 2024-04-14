<script>
    import { createEventDispatcher } from "svelte";

    let title = "Enter what do you want to do."
    let buttonTitle = "Add todo"

    const dispctch = createEventDispatcher()

    let text = ""

    function handleAddClick() {
        dispctch('addItemEvent', text)
    }

</script>

<div class="main-container">
    <label class="todo-label" for="todo-text">{ @html title }</label>
    <input 
        class="todo-input" 
        id="todo-text" 
        bind:value={ text } 
    />
    <button class="add-button" on:click={ handleAddClick }>{ buttonTitle }</button>
</div>


<style>
    .main-container {
        background-color: aquamarine;
        border-radius: 5px;
        padding: 10px;
    }

    .todo-label {
        font-size: large;
        color: black;
    }

    .todo-input {
        width: 100%;
    }

    .add-button {
        cursor: pointer;
    }
</style>