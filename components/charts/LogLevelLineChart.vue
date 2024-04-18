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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// const data = computed(() => {
//   return {
//     labels: [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ],
//     datasets: [
//       {
//         label: "Info",
//         backgroundColor: "#84cc16",
//         data: [40, 39, 10, 40, 39, 80, 40, 100, 99, 40, 10, 15],
//         borderColor: "#84cc16",
//         tension: 0.25,
//       },
//       {
//         label: "Warn",
//         backgroundColor: "#FFFF00",
//         data: [1, 5, 15, 9, 35, 67, 1, 0, 24, 87, 12, 9],
//         borderColor: "#FFFF00",
//         tension: 0.25,
//       },
//       {
//         label: "Error",
//         backgroundColor: "#FF0000",
//         data: [1, 2, 5, 0, 1, 5, 2, 7, 3, 10, 3, 2],
//         borderColor: "#FF0000",
//         tension: 0.25,
//       },
//     ],
//   };
// });
//
// const options = computed(() => {
//   return {
//     responsive: true,
//     maintainAspectRatio: false,
//     layout: {
//       padding: 100,
//     },
//     scales: {
//       y: {
//         suggestedMax: 110,
//       },
//     },
//   };
// });

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
let timestamps = ref([] as string[]);
let classificationData = ref([] as ClassificationChartData[]);
let chartDatasetData = ref([] as ChartDatasetData[]);

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
    let fetchedData = await $nodeFetch<{
      data: any;
    }>(`charts/classificationTimeChart/${sessionStore.value}`, {
      method: "GET",
      query: { files, filters },
    });

    console.log(fetchedData);

    // const fetchedData = {
    //   data: {
    //     time: { penis: 20, penis2: 30 },
    //     time1: { penis: 20 },
    //     time2: { penis: 20 },
    //     time3: { penis: 20 },
    //     time4: { penis: 20 },
    //     time5: { penis: 20 },
    //     time6: { penis: 20 },
    //     time7: { penis: 20 },
    //   },
    // };

    let tempTimestamps: string[] = [];
    let tempClassificationData: ClassificationChartData[] = [];

    for (let [key, value] of Object.entries(fetchedData.data)) {
      tempTimestamps.push(key);
      for (let [name, count] of Object.entries(value as any)) {
        if (
          tempClassificationData.find((value) => value.name == name) !==
          undefined
        ) {
          tempClassificationData
            .find((value) => value.name == name)!
            .counts.push(count as number);
        } else {
          let counts: number[] = [];
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
      for (let data of tempClassificationData.values()) {
        if (data.counts.length !== tempTimestamps.length) {
          data.counts.push(0);
        }
      }
    }
    timestamps.value = tempTimestamps;
    classificationData.value = tempClassificationData;

    createDataSetData();
  } catch (e) {}
}

function createDataSetData() {
  let temp: ChartDatasetData[] = [];
  for (let value of classificationData.value.values()) {
    temp.push({
      label: value.name,
      backgroundColor: "#FF0000",
      borderColor: "#FF0000",
      data: value.counts,
      tension: 0.25,
    });
  }

  chartDatasetData.value = temp;
  console.log(chartDatasetData.value);
}
</script>

<template>
  <Line :data="data" :options="options"></Line>
</template>

<style scoped lang="scss"></style>
