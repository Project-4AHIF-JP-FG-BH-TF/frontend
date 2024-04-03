<script setup lang="ts">
import TestBarChart from "~/components/charts/testCharts/barChart/TestBarChart.vue";
</script>

<template>
  <div id="main">
    <filter-settings></filter-settings>
    <!--  <h1>Statistics</h1>-->
    <!--  <TestBarChart />-->
    <div id="chart" class="grow">
      <!--      <ChartsLogLevelPieChart />-->
      <ChartsTestChartsPieChartTestPieChart></ChartsTestChartsPieChartTestPieChart>
    </div>
  </div>
</template>

<style scoped lang="scss">
#main {
  height: 100vh;

  display: flex;
  justify-content: flex-start;

  flex-direction: column;

  padding: var(--gap);
  gap: var(--gap);

  #chart {
    overflow: hidden;
  }
}
</style>
