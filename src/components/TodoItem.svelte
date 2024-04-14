<script>
    import { createEventDispatcher } from "svelte"
    import { draggable } from '../actions/draggable'

    export let title
    export let done

    const dispctch = createEventDispatcher()

    function handleRemoveClick(event) {
        dispctch('remove')
    }

    function handleDoneChange(event) {
        dispctch('doneChange', event.target.checked)
    }

    let coords = { x: 0, y: 0}
    function handlerDragStart(event) {

    }

    function handlerDragMove(event) {
        coords = {
            x: coords.x + event.detail.dx,
            y: coords.y + event.detail.dy
        }
    }

    function handlerDragEnd(event) {
        coords = { x: 0, y: 0}
    }

</script>


<div 
    class="main-container"
    style="
        transform: translate({coords.x}px, {coords.y}px);
    "
    use:draggable
    on:dragstart={handlerDragStart}
    on:dragmove={handlerDragMove}
    on:dragend={handlerDragEnd}
>
    <div 
        class="inner-container"
        style="
            background-color: {done? '#64ad80' : '#faf792'};
        "
    >
        <input 
            checked={done}
            type="checkbox" 
            on:input={handleDoneChange}
            bind:value={done}
        >
        <p class="title">{ title }</p>
        <button 
            class="remove-button" 
            on:click={ handleRemoveClick }
        >Remove</button>
    </div>
</div>


<style>
    .main-container {
        position: relative;
        height: 50px;
        width: 100%;
        user-select: none;
    }

    .inner-container {
        position: absolute;
        display: flex;
        border-radius: 5px;
        align-items: center;
        background-color: darkseagreen;
        padding: 0 15px;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
    }

    input {
        margin: 0;
        margin-right: 20px;
    }

    p {
        margin: 0;
    }
    
    .title {
        flex: 1;
        cursor: pointer;
    }

    .remove-button {
        color: brown;
        font-weight: bold;
        cursor: pointer;
        margin: 0px;
        border: none;
        background: none;
    }

    .remove-button:active { 
        color: rgb(255, 113, 113);
        border: none;
        background: none;
    }
</style>