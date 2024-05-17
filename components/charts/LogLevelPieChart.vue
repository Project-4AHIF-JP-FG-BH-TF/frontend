<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "vue-chartjs";
import { ToastType } from "~/types/ToastType";
import { useChartColorStore } from "~/stores/chartColorStore";

defineExpose({ loadData });

const { $nodeFetch } = useNuxtApp();
const sessionStore = await useSession();
const filterStore = useFilterStore();
const fileStore = useFileStore();
const toastStore = useToastStore();
const chartColorStore = useChartColorStore();

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

    plugins: {
      legend: {
        labels: {
          color: "#cccccc",
        },
      },
    },
  };
});

const data = computed(() => {
  return {
    labels: labels.value,
    datasets: [
      {
        backgroundColor: labels.value.map((value) =>
          chartColorStore.colors.get(value),
        ),
        borderColor: "#1f2836",

        data: classificationData.value,
      },
    ],
  };
});
const labels = ref([] as string[]);
const classificationData = ref([] as number[]);

async function loadData() {
  const files = fileStore.files
    .filter((value) => value.active)
    .map((value) => value.name);
  const filters = filterStore.getFilter;

  try {
    const fetchedData = await $nodeFetch<{
      data: [{ classification: string; count: number }];
    }>(`charts/classificationChart/${sessionStore.value}`, {
      method: "GET",
      query: { files, filters },
    });

    const tempLabels: string[] = [];
    const tempCounts: number[] = [];

    for (const chartObject of fetchedData.data) {
      tempLabels.push(chartObject.classification);
      tempCounts.push(chartObject.count);
    }

    labels.value = tempLabels;
    classificationData.value = tempCounts;
  } catch (e) {
    toastStore.addMessage({
      message: "Failed to fetch diagram data!",
      type: ToastType.ERROR,
    });
  }

  chartColorStore.addColorsForMissingLabels(labels.value);
}
</script>

<template>
  <Pie :data="data" :options="options" />
</template>

<style scoped lang="scss"></style>
