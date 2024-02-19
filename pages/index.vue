<script setup lang="ts">
import TableView from "~/components/TableView.vue";
</script>

<template>
  <div id="main">
    <FilterSettings />
    <TableView />
  </div>
</template>

<style scoped lang="scss">
#main {
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: start;

  flex-direction: column;

  padding: var(--gap);
  gap: var(--gap);
}
</style>
