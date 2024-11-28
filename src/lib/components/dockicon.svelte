<script lang="ts">
    import { type ClassValue, clsx } from "clsx";
    import { twMerge } from "tailwind-merge";

    export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
    }

    import {
      Motion,
      useMotionValue,
      useSpring,
      useTransform,
    } from "svelte-motion";
  
    export let magnification = 60;
    export let distance = 160;
    export let mouseX = 0;
    export let href: string | undefined = undefined; // Added href prop
    let mint = useMotionValue(mouseX);
    $: mint.set(mouseX);
  
    let className: string | undefined = "";
    export { className as class };
  
    let iconElement: HTMLDivElement;
  
    let distanceCalc = useTransform(mint, (val: number) => {
      const bounds = iconElement?.getBoundingClientRect() ?? { x: 0, width: 0 };
      return val - bounds.x - bounds.width / 2;
    });
  
    let widthSync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [38, magnification, 38]
    );
  
    let width = useSpring(widthSync, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });
  
    let iconClass = cn(
      "flex aspect-square cursor-pointer items-center justify-center rounded-full",
      className
    );
</script>
  
{#if href}
  <!-- Render anchor tag if href is provided -->
  <a href={href} class="inline-block">
    <Motion style={{ width: width }} let:motion>
      <div use:motion bind:this={iconElement} class={iconClass}>
        <slot></slot>
      </div>
    </Motion>
  </a>
{:else}
  <!-- Render normal dock icon -->
  <Motion style={{ width: width }} let:motion>
    <div use:motion bind:this={iconElement} class={iconClass}>
      <slot></slot>
    </div>
  </Motion>
{/if}
