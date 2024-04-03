<script setup lang="ts">
import { useFileStore } from "~/stores/fileStore";
import FileUpload from "~/components/files/FileUpload.vue";
import FileEntry from "~/components/files/FileEntry.vue";
import LoadingFileEntry from "~/components/files/LoadingFileEntry.vue";

const { $rustFetch } = useNuxtApp();

const fileStore = useFileStore();
fileStore.refetch();

async function onUploadFile(files: FileList) {
  const sessionStore = await useSession();
  const formData = new FormData();

  for (const file of files) {
    formData.append("data", file);
    fileStore.addUploadingFile(file.name);
  }

  // todo handle upload error via popup or something
  $rustFetch(`/file/upload/${sessionStore.value}`, {
    method: "POST",
    body: formData,
  })
    .then(() => {
      fileStore.refetch();
    })
    .finally(() => {
      for (const file of files) {
        fileStore.removeUploadingFile(file.name);
      }
    });
}
</script>

<template>
  <div id="view">
    <FileUpload @upload="onUploadFile" />
    <div id="file-entries-container">
      <FileEntry
        v-for="(file, index) in fileStore.files"
        :key="file.name"
        :index="index"
      />
      <LoadingFileEntry
        v-for="file in fileStore.uploadingFiles"
        :key="file.name"
        :file="file"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
#view {
  width: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: var(--gap);

  #file-entries-container {
    border-radius: 10px;
    padding: 10px;

    background-color: var(--highlighted-background);
  }
}
</style>
