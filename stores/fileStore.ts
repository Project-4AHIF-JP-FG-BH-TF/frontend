export interface FileData {
  name: string;
  active: boolean;
}

interface FileStoreState {
  files: FileData[];
}

export const useFileStore = defineStore("files", {
  state: (): FileStoreState => ({
    files: [],
  }),
  actions: {
    async refetch() {
      const { $nodeFetch } = useNuxtApp();
      const sessionStore = await useSession();

      try {
        const data = await $nodeFetch<{ files: string[] }>(
          `/files/${sessionStore.value}`,
          {
            method: "GET",
          },
        );

        this.files = data.files.map((file) => {
          const object = this.files.find((value) => value.name === file);

          return {
            name: file,
            active: object ? object.active : false,
          } as FileData;
        });
      } catch (e) {}
    },
  },
});
