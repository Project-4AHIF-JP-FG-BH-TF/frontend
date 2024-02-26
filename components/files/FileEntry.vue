<script setup lang="ts">
import type { FileData } from "~/stores/fileStore";

const props = defineProps<{ file: FileData }>();

function setActive() {
  props.file.active = !props.file.active;
}
</script>

<template>
  <div id="container" @click="setActive">
    <input id="checkbox" type="checkbox" v-model="props.file.active" />
    <Icon name="ph:file" size="20" />
    {{ file.name }}
  </div>
</template>

<style scoped lang="scss">
#container {
  display: flex;
  align-items: center;
  margin: 3px;
}
</style>
