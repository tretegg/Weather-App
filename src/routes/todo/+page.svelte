<script lang="ts">
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { writable } from 'svelte/store';
    import { fade, fly } from "svelte/transition";

    type Task = {
        id: string;
        text: string;
    };

    let taskInput: HTMLInputElement;
    let newTaskText: string = "";
    let isHandlingClick: boolean = false;
    const storedTasks = writable<Task[]>([]);

    // Function to load items from localStorage
    function loadItems() {
        if (typeof window !== 'undefined') {
            const items = JSON.parse(localStorage.getItem('items') || '[]');
            storedTasks.set(items);
        }
    }

    // Function to save items to localStorage
    function saveItems(items: Task[]) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('items', JSON.stringify(items));
        }
    }

    function addItem(): void {
        if (newTaskText.trim() !== '') {
            storedTasks.update(items => {
                const newTask: Task = { id: generateId(), text: newTaskText };
                const updatedItems = [...items, newTask];
                saveItems(updatedItems);
                return updatedItems;
            });
            newTaskText = '';
        }
    }

    // Remove an item
    function removeItem(id: string): void {
        storedTasks.update(tasks => {
            const updatedTasks = tasks.filter(task => task.id !== id);
            saveItems(updatedTasks);
            return updatedTasks;
        });
    }
    
    function generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
    
    async function handleClick() {
        // Prevents the function from being called multiple times when pressing enter
        if (isHandlingClick) return;
        isHandlingClick = true;

        newTaskText = taskInput.value; 
        addItem();

        isHandlingClick = false;
    }

    onMount(() => {
        loadItems();
    })
</script>

<svelte:window 
    on:keypress={(e) => {
        if (e.key === "Enter") handleClick()
    }}
/>

<div class="w-full h-[8%] border-b flex items-center justify-center space-x-8">
    <div class="flex space-x-4">
        <div class="flex items-center justify-center">
            <p class="text-sm pr-2">Add a task: </p>
            <input 
                placeholder="e.g Homework" 
                class="!outline-none text-black pl-1" 
                bind:this={taskInput} 
                bind:value={newTaskText}
                type="text"
            >
        </div>
        <button 
            class:isHandlingClick 
            class="px-2 py-1 border transitions duration-300 hover:scale-110 active:scale-105" 
            on:click={handleClick}
        >
            Add
        </button>
    </div>
</div>

<div class="w-full max-w-md mx-auto p-4">
    {#each $storedTasks as task (task.id)}
        <div 
            in:fly={{ y: -50, duration: 300 }} 
            out:fade={{ duration: 300 }}
            animate:flip={{ duration: 300 }}
            class="w-full border border-gray-300 rounded-md my-2 p-2 flex items-center justify-between transition-all duration-300 hover:border-gray-400">
            <p>{task.text}</p>
            <label class="inline-flex items-center cursor-pointer">
                <input 
                    type="radio" 
                    class="form-radio text-blue-600" 
                    name={`task-${task.id}`} 
                    on:change={() => removeItem(task.id)}
                />
                <span class="sr-only">Mark as complete</span>
            </label>
        </div>
    {/each}
</div>

<style>

</style>