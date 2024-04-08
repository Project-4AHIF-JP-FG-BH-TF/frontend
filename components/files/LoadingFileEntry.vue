<script setup lang="ts">
import type { UploadingFileData } from "~/stores/fileStore";

const props = defineProps<{ file: UploadingFileData }>();

const runningSeconds = ref(0);
let interval: NodeJS.Timeout;

const seconds = computed(() => {
  return Math.round(runningSeconds.value) % 60;
});

const minutes = computed(() => {
  return Math.floor(Math.round(runningSeconds.value) / 60);
});

onMounted(() => {
  interval = setInterval(() => {
    runningSeconds.value =
      (new Date().getTime() - props.file.startTime.getTime()) / 1000;
  }, 500);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div id="container">
    <div>
      <icon name="line-md:uploading-loop" size="24" />
      {{ file.name }}
    </div>
    <div>{{ minutes }}m {{ seconds }}s</div>
  </div>
</template>

<style scoped lang="scss">
#container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3px;
}
</style>
