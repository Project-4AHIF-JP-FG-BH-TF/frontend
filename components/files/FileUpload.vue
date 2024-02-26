<script setup lang="ts">
const emits = defineEmits<{ upload: [files: FileList] }>();

function onDrop(e: DragEvent) {
  if (!e.dataTransfer) {
    return;
  }

  emits("upload", e.dataTransfer.files);
}

function onFileInput(e: Event) {
  const target = e.target as HTMLInputElement;

  if (!target || !target.files) {
    return;
  }

  emits("upload", target.files);
}
</script>

<template>
  <input id="fileInput" type="file" multiple @input="onFileInput" />
  <label id="dropzone" for="fileInput" @drop.prevent="onDrop" @dragover.prevent>
    <icon name="basil:upload-outline" size="24" />
    Upload File
  </label>
</template>

<style scoped>
input {
  display: none;
}

#dropzone {
  display: flex;
  align-items: center;

  height: 50px;
  border-radius: 10px;
  padding: 10px;

  border: var(--highlighted-background) dashed 4px;

  cursor: pointer;
}
</style>
