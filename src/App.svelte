<script>
	import TaskSaveForm from './components/TaskSaveForm.svelte';
	import TasksList from './components/TasksList.svelte';

	import { tasksStorage } from './store/tasksStorage'
	import { tasksInfoStorage } from './store/tasksInfoStorage'

	import BaseLayout from './layouts/BaseLayout.svelte';

	function handleTaskSaveClick(event) {
		tasksStorage.add(event.detail)
    }

	function handleTaskCompletedChange(event) {
		tasksStorage.updateCompleted(event.detail)
	}

	function handleTeskRemove(event) {
		tasksStorage.remove(event.detail)
	}

	$: noTaskMessageView = $tasksStorage.length === 0

</script>

<BaseLayout>
	<div slot="header"></div>

	<TaskSaveForm
		on:taskSaveEvent={handleTaskSaveClick}
	/>

	<div class="stats-container">
		{#if noTaskMessageView}
			<span>No tasks yet</span>
		{:else}
			<span>{$tasksInfoStorage.tasksCompleted.length}/{$tasksInfoStorage.tasksTotalCount}</span>
		{/if}
	</div>

	<div class="tasks-container">
		<TasksList 
			tasks={$tasksStorage.filter(task => !task.taskCompleted)} 
			on:taskCompletedChange={(event) => handleTaskCompletedChange(event.detail)}
			on:taskRemove={(event) => handleTeskRemove(event.detail)}
		/>
		<TasksList 
			tasks={$tasksStorage.filter(task => task.taskCompleted)} 
			on:taskCompletedChange={(event) => handleTaskCompletedChange(event.detail)}
			on:taskRemove={(event) => handleTeskRemove(event.detail)}
		/>
	</div>

	<div slot="footer"m class="footer-item">
		<p>Thank you!</p>
	</div>
</BaseLayout>


<style>
	.tasks-container {
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

	.footer-item {
		font-size: 18px;
		color: darkgray;
	}
</style>
