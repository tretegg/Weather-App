<script lang="ts">
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { writable } from 'svelte/store';
    import { fly } from "svelte/transition";
    import Borderbeam from "$lib/components/borderbeam.svelte";
    import Dock from "$lib/components/docktest.svelte";
    import NewInput from "$lib/components/base/newInput.svelte";

    type Task = {
        id: string;
        text: string;
        details: string; // New property for additional information
    };

    let flip_time = 300;
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
                const newTask: Task = { id: generateId(), text: newTaskText, details: "" };
                const updatedItems = [...items, newTask];
                saveItems(updatedItems);
                return updatedItems;
            });
            newTaskText = '';
        }
    }

    function updateDetails(id: string, details: string): void {
        storedTasks.update(tasks => {
            const updatedTasks = tasks.map(task => 
                task.id === id ? { ...task, details } : task
            );
            saveItems(updatedTasks);
            return updatedTasks;
        });
    }

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
        if (isHandlingClick) return;
        isHandlingClick = true;

        newTaskText = taskInput.value;
        addItem();

        isHandlingClick = false;
    }

    let isInputFocused: boolean = false;

    // Watch for focus and blur events
    function handleFocus() {
        isInputFocused = true;
    }

    function handleBlur() {
        isInputFocused = false;
    }

    onMount(() => {
        // Ensures the user has the input box focused
        taskInput.addEventListener('focus', handleFocus);
        taskInput.addEventListener('blur', handleBlur);
        loadItems();
    });
</script>

<svelte:window 
    on:keypress={(e) => {
        if (e.key === "Enter" && isInputFocused) handleClick();
    }}
/>

<div class="w-full h-[8%] border-b flex items-center justify-center space-x-8">
    <div class="flex space-x-4 items-center">
        <p class=" pr-2">Add a task: </p>
        <!-- Input Field Wrapper -->
        <div class="relative group">
            <!-- Input Field -->
            <NewInput placeholder="e.g Homework" bind:element={taskInput} bind:value={newTaskText}/>
        </div>
        <!-- Button -->
        <button 
            class:isHandlingClick 
            class="px-2 py-1 border transition duration-300 hover:scale-110 active:scale-105" 
            on:click={handleClick}>
            Add
        </button>
    </div>
</div>


<div class="w-full h-[92%] max-w-md mx-auto flex flex-col items-center p-4 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-800 scrollbar-thumb-rounded-md overflow-x-hidden">
    {#each $storedTasks as task (task.id)}
    <div
        class="task-container w-[95%] border border-gray-300 rounded-md my-2 p-2 transition-all duration-300 hover:scale-105 relative shadow-lg hover:[box-shadow:0_0_20px_0px_rgba(255,255,255,0.5)]"
        in:fly={{ y: 50, duration: 300 }}
        animate:flip={{ duration: 300 }}>
        <Borderbeam size={150} duration={15} colorFrom="#ffffff" colorTo="#393D3F"/>
        <!-- Task Text -->
        <p class="font-semibold">{task.text}</p>
        
        <!-- Task Details Input -->
        <input type="text"  
            placeholder="Add more details..." 
            class="w-full mt-2 p-1 border border-gray-200 rounded focus:outline-none focus:border-gray-400 bg-black"
            value={task.details}
            on:change={(e) => updateDetails(task.id, e.currentTarget.value)}/>
        
        <!-- Remove Task Option -->
        <div class="absolute top-2 right-2">
            <label class="inline-flex items-center cursor-pointer">
                <input 
                    type="radio" 
                    class="form-radio text-blue-600" 
                    name={`task-${task.id}`} 
                    on:change={() => removeItem(task.id)}/>
                <span class="sr-only">Mark as complete</span>
            </label>
        </div>
    </div>
    {/each}
</div>
