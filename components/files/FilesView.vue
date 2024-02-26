<script setup lang="ts">
import { useFileStore } from "~/stores/fileStore";
import FileUpload from "~/components/files/FileUpload.vue";
import FileEntry from "~/components/files/FileEntry.vue";
import LoadingFileEntry from "~/components/files/LoadingFileEntry.vue";

const { $rustFetch } = useNuxtApp();

const fileStore = useFileStore();
fileStore.reFetch();

const uploadingFiles = reactive<{ name: String }[]>([]);

async function onUploadFile(files: FileList) {
  const sessionStore = await useSession();
  const formData = new FormData();

  for (const file of files) {
    formData.append("data", file);
    uploadingFiles.push({ name: file.name });
  }

  // todo handle upload error via popup or something
  $rustFetch(`/file/upload/${sessionStore.value}`, {
    method: "POST",
    body: formData,
  })
    .then(() => {
      fileStore.reFetch();
    })
    .finally(() => {
      for (const file of files) {
        uploadingFiles.splice(
          uploadingFiles.findIndex((value) => value.name === file.name),
          1,
        );
      }
    });
}
</script>

<template>
  <div id="view">
    <FileUpload @upload="onUploadFile" />
    <div id="file-entries-container">
      <FileEntry
        v-for="file in fileStore.files"
        :key="file.name"
        :file="file"
      />
      <LoadingFileEntry
        v-for="file in uploadingFiles"
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
