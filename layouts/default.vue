<script setup lang="ts"></script>

<template>
  <div id="base">
    <SideBar />
    <main>
      <slot />
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
  }
}
</style>
