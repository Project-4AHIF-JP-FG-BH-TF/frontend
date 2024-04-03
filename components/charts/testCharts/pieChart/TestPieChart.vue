<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import * as chartConfig from "./chartConfig.js";
import { data, options } from "./chartConfig.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "App",
  components: {
    Pie,
  },
  data() {
    return chartConfig;
  },
  computed: {
    options() {
      return options;
    },
    data() {
      return data;
    },
  },
};
</script>

<template>
  <Pie :data="data" :options="options" />
</template>

<style scoped lang="scss"></style>
