<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";
import * as chartConfig from "./chartConfig.js";
import { data, options } from "./chartConfig.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default {
  name: "App",
  computed: {
    data() {
      return data;
    },
    options() {
      return options;
    },
  },
  components: {
    Bar,
  },
  data() {
    return chartConfig;
  },
};
</script>

<template>
  <Bar id="my-chart-id" :options="options" :data="data" />
</template>

<style scoped lang="scss"></style>
