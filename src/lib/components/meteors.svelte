<script lang="ts">
    import { type ClassValue, clsx } from "clsx";
    import { twMerge } from "tailwind-merge";
    import { onMount } from "svelte";
  
    function cn(...inputs: ClassValue[]) {
    	return twMerge(clsx(inputs));
    }

    export let number = 10;
    
    let meteorStyles: any = [];

    let changeMeteors = (num: number) => {
      meteorStyles = [];
      const styles = [...new Array(num)].map(() => ({
        top: 0,
        left: Math.floor(Math.random() * 400) + "px",
        animationDelay: Math.random() * 1 + 0.2 + "s",
        animationDuration: Math.floor(Math.random() * 8 + 2.9) + "s",
      }));
      meteorStyles = styles;
    };

    onMount(() => {
      changeMeteors(number);
    });
    //   $: changeMeteors(number);
</script>
  
  {#each meteorStyles as style, idx}
    <span
      id="meteor-{idx+1}"
      class={cn(
        "pointer-events-none absolute left-1/2 top-1/2 size-[2.4px] rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
      )}
      style="top: {style.top}px; left: {style.left}; animation-delay: {style.animationDelay}; animation-duration: {style.animationDuration};"
    >
      <!-- Meteor Tail  -->
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <div
        class="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 via-blue-600/30 to-transparent"
      />
    </span>
  {/each}