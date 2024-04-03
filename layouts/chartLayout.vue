<script setup lang="ts"></script>

<template>
  <div id="base">
    <SideBar />
    <main>
      <div id="main">
        <filter-settings />
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
#base {
  --side-width: 190px;

  width: 100vw;
  height: 100vh;

  display: flex;

  main {
    width: calc(100vw - var(--side-width));

    #main {
      height: 100vh;

      display: flex;
      justify-content: flex-start;

      flex-direction: column;

      padding: var(--gap);
      gap: var(--gap);

      position: relative;
    }
  }
}
</style>
