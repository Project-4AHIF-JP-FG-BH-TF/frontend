import { ToastType } from "~/types/ToastType";

export interface FileData {
  name: string;
  active: boolean;
}

export interface UploadingFileData {
  name: string;
  startTime: Date;
}

interface FileStoreState {
  files: FileData[];
  uploadingFiles: UploadingFileData[];
}

export const useFileStore = defineStore("files", {
  state: (): FileStoreState => ({
    files: [],
    uploadingFiles: [],
  }),
  actions: {
    async refetch() {
      const { $nodeFetch } = useNuxtApp();
      const sessionStore = await useSession();
      const toastStore = useToastStore();

      try {
        const data = await $nodeFetch<{ files: string[] }>(
          `/files/${sessionStore.value}`,
          {
            method: "GET",
          },
        );

        this.files = data.files
          .map((file) => {
            const object = this.files.find((value) => value.name === file);

            return {
              name: file,
              active: object ? object.active : true,
            } as FileData;
          })
          .filter((value) => {
            for (const uploadingFile of this.uploadingFiles) {
              if (uploadingFile.name.startsWith(value.name)) {
                return false;
              }
            }

            return true;
          });
      } catch (e) {
        toastStore.addMessage({
          message: "Failed to refetch files!",
          type: ToastType.ERROR,
        });
      }
    },
    addUploadingFile(name: string) {
      this.uploadingFiles.push({ name, startTime: new Date() });
    },
    removeUploadingFile(name: string) {
      this.uploadingFiles.splice(
        this.uploadingFiles.findIndex((value) => value.name === name),
        1,
      );
    },
  },
});
