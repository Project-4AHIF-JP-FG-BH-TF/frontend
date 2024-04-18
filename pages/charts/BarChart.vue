<script setup lang="ts">
import InterfaceBarChart from "~/components/charts/InterfaceBarChart.vue";
import ChartDisplay from "~/components/charts/ChartDisplay.vue";

definePageMeta({
  layout: undefined,
});

const chart = ref<typeof InterfaceBarChart | null>(null);

const ipsStore = useIpsStore();
const classificationStore = useClassificationStore();
const entryCountStore = useEntryCountStore();

async function onSettingsChange(callback: () => void) {
  const promises = [];

  promises.push(entryCountStore.reloadCount());
  promises.push(ipsStore.reloadIps());
  promises.push(classificationStore.reloadClassifications());
  promises.push(chart.value!.loadData());

  await Promise.all(promises);

  return callback();
}
</script>

<template>
  <ChartDisplay>
    <template #header>
      <FilterSettings @change="onSettingsChange" />
    </template>
    <InterfaceBarChart ref="chart" />
  </ChartDisplay>
</template>

<style scoped lang="scss"></style>
