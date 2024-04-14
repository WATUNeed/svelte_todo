<script>
	import { crossfade } from 'svelte/transition'
	import { cubicIn } from 'svelte/easing'
	import { flip } from 'svelte/animate';

	import AddTodoItem from "./components/AddTodoItem.svelte";
	import TodoItem from "./components/TodoItem.svelte";
	import { todoItems } from './store/customStore'
	import { todoStats } from './store/todoStats'

	import BaseLayout from './layouts/BaseLayout.svelte';

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

	function handleAddClick(event) {
		todoItems.add(event.detail)
    }

	function handleDoneChange(id, done) {
		todoItems.setDone(id, done)
	}

	function handleRemove(id) {
		todoItems.remove(id)
	}

	$: noTaskMessageView = $todoItems.length === 0

</script>

<BaseLayout>
	<div slot="header" let:greeting>
		<p>{greeting} Welcome</p>
	</div>
	<div slot="footer"m class="footer-item">
		<p>Thank you!</p>
	</div>
	<AddTodoItem on:addItemEvent={ handleAddClick } />

	<div class="stats-container">
		{#if noTaskMessageView}
			<p>No tasks yet</p>
		{:else}
			<p>{$todoStats.doneCount}/{$todoStats.totalCount}</p>
		{/if}
	</div>
	<div class="todos-container">
		<div class="todo-items-container">
			{#each $todoItems.filter(item => !item.done) as { id, text, done }, index (id)}
				<div 
					class="todo-item-container"
					in:receive="{{ key: id }}"
					out:send="{{ key: id }}"
					animate:flip="{{ duration: 500 }}"
				>
					<TodoItem 
						title={text} 
						done={done}
						on:doneChange={(event) => handleDoneChange(id, event.detail)}
						on:remove={() => handleRemove(id)}
					/>
				</div>
			{/each}
		</div>

		<div class="todo-items-container">
			{#each $todoItems.filter(item => item.done) as { id, text, done }, index (id)}
				<div 
					class="todo-item-container"
					in:receive="{{ key: id }}"
					out:send="{{ key: id }}"
					animate:flip="{{ duration: 500 }}"
				>
					<TodoItem 
						title={text} 
						done={done}
						on:doneChange={(event) => handleDoneChange(id, event.detail)}
						on:remove={() => handleRemove(id)}
					/>
				</div>
			{/each}
		</div>
	</div>
</BaseLayout>


<style>
	.todos-container {
		width: 100%;
		display: flex;
	}

	.stats-container {
		padding: 5px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
        justify-content: center;
	}

	.todo-items-container {
		flex: 1;
		padding: 5px;
		box-sizing: border-box;
	}

	.todo-item-container {
		margin-bottom: 5px;
		margin-top: 5px;
	}

	.footer-item {
		font-size: 18px;
		color: darkgray;
	}
</style>
