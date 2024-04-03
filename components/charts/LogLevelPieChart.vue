<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

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
    labels: ["Error", "Warn", "Info"],
    datasets: [
      {
        backgroundColor: ["#FF0000", "#FFFF00", "#545454"],
        borderColor: "#1f2836",

        data: [10, 20, 50],
      },
    ],
  };
});

// let fetchedData = {};
//
// async function loadData() {
//   const { $nodeFetch } = useNuxtApp();
//   const sessionStore = await useSession();
//   const filterStore = useFilterStore();
//   const fileStore = useFileStore();
//
//   const files = fileStore.files
//     .filter((value) => value.active)
//     .map((value) => value.name);
//   const filters = filterStore.getFilter;
//
//   try {
//     fetchedData = await $nodeFetch<{}>(
//       `/log/${sessionStore.value}/classifications`,
//       {
//         method: "GET",
//         query: { files, filters },
//       },
//     );
//   } catch (e) {}
// }
</script>

<template>
  <Pie :data="data" :options="options" />
</template>

<style scoped lang="scss"></style>
