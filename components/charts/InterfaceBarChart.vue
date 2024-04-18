<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

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
        label: ">500.000",
        backgroundColor: ["#FF0000"],
        borderColor: "#1f2836",

        data: counts.value.filter((value) => value > 500000),
      },
      {
        label: ">250.000",
        backgroundColor: ["#FFFF00"],
        borderColor: "#1f2836",

        data: counts.value.filter((value) => value <= 500000 && value > 250000),
      },
      {
        label: ">100.000",
        backgroundColor: ["#00FF00"],
        borderColor: "#1f2836",

        data: counts.value.filter((value) => value <= 250000 && value > 100000),
      },
      {
        label: ">50.000",
        backgroundColor: ["#FF00FF"],
        borderColor: "#1f2836",

        data: counts.value.filter((value) => value <= 100000 && value > 50000),
      },
      {
        label: ">10.000",
        backgroundColor: ["#454545"],
        borderColor: "#1f2836",

        data: counts.value.filter((value) => value <= 50000 && value > 10000),
      },
      {
        label: ">5.000",
        backgroundColor: ["#454545"],
        borderColor: "#1f2836",

        data: counts.value.filter((value) => value <= 10000 && value > 5000),
      },
      {
        label: "<5.000",
        backgroundColor: ["#454545"],
        borderColor: "#1f2836",

        data: counts.value.filter((value) => value <= 5000),
      },
    ],
  };
});

const labels = ref([] as string[]);
const counts = ref([] as number[]);

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
    const fetchedData = await $nodeFetch<{
      data: [{ java_class: string; count: number }];
    }>(`charts/classChart/${sessionStore.value}`, {
      method: "GET",
      query: { files, filters },
    });

    const tempLabels: string[] = [];
    const tempCounts: number[] = [];

    for (const chartObject of fetchedData.data) {
      tempLabels.push(chartObject.java_class);
      tempCounts.push(chartObject.count);
    }

    labels.value = tempLabels;
    counts.value = tempCounts;

    console.log(labels.value.length);
    console.log(labels.value.at(labels.value.length - 1));
  } catch (e) {}
}

defineExpose({ loadData });
</script>

<template>
  <Bar :options="options" :data="data" />
</template>

<style scoped lang="scss"></style>
