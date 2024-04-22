<script setup lang="ts"></script>

<template>
  <div id="main">
    <slot name="header" />
    <div id="container">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
#main {
  height: 100vh;

  display: flex;
  justify-content: flex-start;

  flex-direction: column;

  padding: var(--gap);
  gap: var(--gap);

  position: relative;

  #container {
    width: 100%;
    height: 100vh;

    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
