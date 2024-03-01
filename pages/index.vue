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
  height: 100vh;

  display: flex;
  justify-content: flex-start;

  flex-direction: column;

  padding: var(--gap);
  gap: var(--gap);
}
</style>
