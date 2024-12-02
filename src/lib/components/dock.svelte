<script lang="ts">
    import { Motion } from "svelte-motion";
    import { cva, type VariantProps } from "class-variance-authority";
    import { type ClassValue, clsx } from "clsx";
    import { twMerge } from "tailwind-merge";

    export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
    }

  
    interface DockProps extends VariantProps<typeof dockVariants> {
      className?: string;
      magnification?: number;
      distance?: number;
      direction?: "top" | "middle" | "bottom";
    }
  
    let className: DockProps["className"] = undefined;
    export { className as class };
    export let magnification: DockProps["magnification"] = 60;
    export let distance: DockProps["distance"] = 140;
    export let direction: DockProps["direction"] = "middle";
  
    const dockVariants = cva(
      "mx-auto w-max mt-8 h-[58px] group p-2 flex gap-2 overflow-clip rounded-2xl border supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md"
    );
  
    let dockElement: HTMLDivElement;
    let mouseX = Infinity;
    function handleMouseMove(e: MouseEvent) {
      mouseX = e.pageX;
    }
  
    function handleMouseLeave() {
      mouseX = Infinity;
    }
  
    let dockClass = cn(dockVariants({ className }), {
      "items-start": direction === "top",
      "items-center": direction === "middle",
      "items-end": direction === "bottom",
    });
  </script>
  
  <Motion let:motion>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      use:motion
      bind:this={dockElement}
      on:mousemove={(e) => handleMouseMove(e)}
      on:mouseleave={handleMouseLeave}
      class={dockClass}
      style="--tag: dock;"
    >
      <slot {mouseX} {magnification} {distance}>
        <!-- Your Content -->
        Default
      </slot>
    </div>
  </Motion>
  