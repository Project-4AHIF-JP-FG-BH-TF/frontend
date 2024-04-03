<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "App",
  components: {
    Pie,
  },
  computed: {
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 100,
        },
      };
    },
    data() {
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
    },
  },
};
</script>

<template>
  <Pie :data="data" :options="options" />
</template>

<style scoped lang="scss"></style>
