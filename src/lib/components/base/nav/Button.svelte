<script lang="ts">
    export let name: string
    export let href: string
    export let current: boolean
</script>

<a href="{href}" class:current class="hover:scale-105 active:scale-95 subpixel-antialiased px-2 py-1 transitions duration-500 ease-in-out border border-black">
    {name}
</a>

<style lang="postcss">
    .current {
        @apply border-gray-300
    }

    .current:hover {
        @apply border-white
    }
</style>
