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

const data = computed(() => {
  return {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Info",
        backgroundColor: "#84cc16",
        data: [40, 39, 10, 40, 39, 80, 40, 100, 99, 40, 10, 15],
        borderColor: "#84cc16",
        tension: 0.25,
      },
      {
        label: "Warn",
        backgroundColor: "#FFFF00",
        data: [1, 5, 15, 9, 35, 67, 1, 0, 24, 87, 12, 9],
        borderColor: "#FFFF00",
        tension: 0.25,
      },
      {
        label: "Error",
        backgroundColor: "#FF0000",
        data: [1, 2, 5, 0, 1, 5, 2, 7, 3, 10, 3, 2],
        borderColor: "#FF0000",
        tension: 0.25,
      },
    ],
  };
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
</script>

<template>
  <Line :data="data" :options="options"></Line>
</template>

<style scoped lang="scss"></style>
