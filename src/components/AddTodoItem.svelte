<script>
    import { createEventDispatcher } from "svelte";

    import Form from "./Form.svelte";

    const dispctch = createEventDispatcher()

    function handleAddItem(event) {
        dispctch('addItemEvent', event.detail)
    }
</script>

<Form
    on:addItemEvent={handleAddItem}
/>


<style>

</style>