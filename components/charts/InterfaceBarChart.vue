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
import { ToastType } from "~/types/ToastType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

defineExpose({ loadData });

const { $nodeFetch } = useNuxtApp();
const sessionStore = await useSession();
const filterStore = useFilterStore();
const fileStore = useFileStore();
const toastStore = useToastStore();

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
    scales: {
      y: {
        ticks: {
          color: "#cccccc",
        },
      },
      x: {
        ticks: {
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
        label: "Data",
        backgroundColor: ["#86B6F6"],
        borderColor: "#1f2836",

        data: counts.value,
        barThickness: 25,
      },
    ],
  };
});

const labels = ref([] as string[]);
const counts = ref([] as number[]);

async function loadData() {
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
  } catch (e) {
    toastStore.addMessage({
      message: "Failed to fetch diagram data!",
      type: ToastType.ERROR,
    });
  }
}
</script>

<template>
  <Bar :options="options" :data="data" />
</template>

<style scoped lang="scss"></style>
