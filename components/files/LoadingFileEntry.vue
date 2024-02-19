<script setup lang="ts">
import type { FileData } from "~/stores/fileStore";

defineProps<{ file: FileData }>();
</script>

<template>
  <div>
    {{ file.name }}
  </div>
</template>

<style scoped lang="scss"></style>
