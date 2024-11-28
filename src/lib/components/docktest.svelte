<script>
  import Dock from "$lib/components/dock.svelte";
  import DockIcon from "$lib/components/dockicon.svelte";
</script>

<div class="relative">
    <Dock
    let:magnification
    let:distance
    let:mouseX
    magnification={60}
    distance={110}
    direction="bottom"
  >
    <DockIcon
      href="/"
      {magnification}
      {distance}
      {mouseX}
      class="bg-black/10 dark:bg-white/5 p-3"
    >
      <img src="/svgs/house.svg" alt="home" width="20" height="20" class="svg-white" />
    </DockIcon>
    <DockIcon
      href="/news"
      {magnification}
      {distance}
      {mouseX}
      class="bg-black/10 dark:bg-white/5 p-3"
    >
      <img src="/svgs/news.svg" alt="news" width="20" height="20" class="svg-white" />
    </DockIcon>
    <DockIcon
      href="/norris"
      {magnification}
      {distance}
      {mouseX}
      class="bg-black/10 dark:bg-white/5 p-3"
    >
      <img src="/svgs/norris.svg" alt="norris" width="20" height="20" class="svg-white" />
    </DockIcon>
    <DockIcon
      href="/todo"
      {magnification}
      {distance}
      {mouseX}
      class="bg-black/10 dark:bg-white/5 p-3"
    >
      <img src="/svgs/list.svg" alt="list" width="20" height="20" class="svg-white" />
    </DockIcon>
    <DockIcon
      href="/movies"
      {magnification}
      {distance}
      {mouseX}
      class="bg-black/10 dark:bg-white/5 p-3"
    >
      <img src="/svgs/movie.svg" alt="movies" width="20" height="20" class="svg-white" />
    </DockIcon>
    <DockIcon
      href="https://github.com/tretegg/Weather-App"
      {magnification}
      {distance}
      {mouseX}
      class="bg-black/10 dark:bg-white/5 p-3"
    >
      <img src="/svgs/github.svg" alt="github" width="20" height="20" class="svg-white" />
    </DockIcon>
  </Dock>

</div>

<style>
  .svg-white {
    filter: invert(1) brightness(2);
  }
</style>