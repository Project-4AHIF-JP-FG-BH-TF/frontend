<script setup lang="ts"></script>

<template>
  <div id="main">
    <FilesView />
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
}
</style>
