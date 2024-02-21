<script setup lang="ts">
import type { FileData } from "~/stores/fileStore";

defineProps<{ file: FileData }>();
</script>

<template>
  <div>
    <icon name="line-md:uploading-loop" size="24" />
    {{ file.name }}
  </div>
</template>

<style scoped lang="scss"></style>
