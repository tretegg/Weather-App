<script lang="ts">
    export let placeholder: string
    let clazz: string = "", stylez: string = ""
    export { clazz as class, stylez as style }

    export let value: string = ""
    export let element: HTMLInputElement | undefined = undefined

    $: if (element) {
        element.value = value;
    }
</script>

<div class="relative">
    <input bind:this={element} bind:value={value} 
placeholder="{placeholder}"
class="{clazz} peer w-[200px] text-white bg-transparent !outline-none px-2 py-1 focus:border-transparent focus:outline-none focus:ring-0"
type="text" style="{stylez}">
<!-- Animated Border -->
<div class="absolute bottom-0 left-0 h-[1px] bg-white w-0 transition-all duration-300 peer-focus:w-full"></div>
</div>