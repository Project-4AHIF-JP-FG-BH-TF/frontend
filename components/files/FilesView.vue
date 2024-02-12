<script setup lang="ts">
import { useFileStore } from "~/stores/fileStore";
import File from "~/components/files/File.vue";

let fileStore = useFileStore();
</script>

<template>
  <div>
    <File :file="file" v-for="file in fileStore.files" />
  </div>
</template>

<style scoped lang="scss"></style>
