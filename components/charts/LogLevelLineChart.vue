<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
import { ToastType } from "~/types/ToastType";
import { useChartColorStore } from "~/stores/chartColorStore";
import { formatDate } from "~/util/formatDate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
const chartColorStore = useChartColorStore();

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

interface ClassificationChartData {
  name: string;
  counts: number[];
}

interface ChartDatasetData {
  label: string;
  backgroundColor: string;
  data: number[];
  borderColor: string;
  tension: 0.25;
}

const data = computed(() => {
  return {
    labels: timestamps.value,
    datasets: chartDatasetData.value,
  };
});
const timestamps = ref([] as string[]);
const classificationData = ref([] as ClassificationChartData[]);
const chartDatasetData = ref([] as ChartDatasetData[]);

async function loadData() {
  const files = fileStore.files
    .filter((value) => value.active)
    .map((value) => value.name);
  const filters = filterStore.getFilter;

  try {
    const fetchedData = await $nodeFetch<{
      data: any;
    }>(`charts/classificationTimeChart/${sessionStore.value}`, {
      method: "GET",
      query: { files, filters },
    });

    console.log(fetchedData);

    const tempTimestamps: string[] = [];
    const tempClassificationData: ClassificationChartData[] = [];

    for (const [key, value] of Object.entries(fetchedData.data)) {
      tempTimestamps.push(formatDate(new Date(key), false));
      for (const [name, count] of Object.entries(value as any)) {
        if (
          tempClassificationData.find((value) => value.name === name) !==
          undefined
        ) {
          tempClassificationData
            .find((value) => value.name === name)!
            .counts.push(count as number);
        } else {
          const counts: number[] = [];
          for (let i = 1; i < tempTimestamps.length - 1; i++) {
            counts.push(0);
          }
          counts.push(count as number);
          tempClassificationData.push({
            name,
            counts,
          } as ClassificationChartData);
        }
      }
      for (const data of tempClassificationData.values()) {
        if (data.counts.length !== tempTimestamps.length) {
          data.counts.push(0);
        }
      }
    }
    timestamps.value = tempTimestamps;
    classificationData.value = tempClassificationData;

    chartColorStore.addColorsForMissingLabels(
      classificationData.value.map((value) => value.name),
    );

    createDataSetData();
  } catch (e) {
    toastStore.addMessage({
      message: "Failed to fetch diagram data!",
      type: ToastType.ERROR,
    });
  }
}

function createDataSetData() {
  const temp: ChartDatasetData[] = [];
  for (const value of classificationData.value.values()) {
    const color = chartColorStore.colors.get(value.name);

    temp.push({
      label: value.name,
      backgroundColor: color,
      borderColor: color,
      data: value.counts,
      tension: 0.25,
    } as ChartDatasetData);
  }

  chartDatasetData.value = temp;
}
</script>

<template>
  <Line :data="data" :options="options"></Line>
</template>

<style scoped lang="scss"></style>
