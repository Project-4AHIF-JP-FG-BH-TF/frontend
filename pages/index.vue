<script setup lang="ts">
import TableView from "~/components/TableView.vue";

const entryStore = useLogEntryStore();
const ipsStore = useIpsStore();
const classificationStore = useClassificationStore();
const entryCountStore = useEntryCountStore();

async function onSettingsChange(callback: () => void) {
  const promises = [];

  promises.push(entryStore.reloadEntries());
  promises.push(entryCountStore.reloadCount());
  promises.push(ipsStore.reloadIps());
  promises.push(classificationStore.reloadClassifications());

  await Promise.all(promises);

  return callback();
}
</script>

<template>
  <div id="main">
    <FilterSettings @change="onSettingsChange" />
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
