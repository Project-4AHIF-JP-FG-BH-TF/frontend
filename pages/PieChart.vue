<script setup lang="ts">
definePageMeta({
  layout: "chart-layout",
});
</script>

<template>
  <div id="container">
    <ChartsLogLevelPieChart></ChartsLogLevelPieChart>
  </div>
</template>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
}
</style>
