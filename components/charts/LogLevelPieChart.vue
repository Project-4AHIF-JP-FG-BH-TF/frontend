<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);
onMounted(() => {
  loadData();
});

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 100,
    },
  };
});

const data = computed(() => {
  return {
    labels: labels.value,
    datasets: [
      {
        backgroundColor: ["#FF0000", "#FFFF00", "#545454"],
        borderColor: "#1f2836",

        data: classificationData.value,
      },
    ],
  };
});

let fetchedData;
let labels = ref([] as string[]);
let classificationData = ref([] as number[]);

async function loadData() {
  const { $nodeFetch } = useNuxtApp();
  const sessionStore = await useSession();
  const filterStore = useFilterStore();
  const fileStore = useFileStore();

  const files = fileStore.files
    .filter((value) => value.active)
    .map((value) => value.name);
  const filters = filterStore.getFilter;

  try {
    fetchedData = await $nodeFetch<{
      data: [{ classification: string; count: number }];
    }>(`/charts/classificationChart/${sessionStore.value}`, {
      method: "GET",
      query: { files, filters },
    });

    for (let chartObject of fetchedData.data) {
      labels.value.push(chartObject.classification);
      classificationData.value.push(chartObject.count);
    }
  } catch (e) {}
}
</script>

<template>
  <Pie :data="data" :options="options" />
</template>

<style scoped lang="scss"></style>
