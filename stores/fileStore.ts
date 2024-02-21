export interface FileData {
  name: string;
}

interface FileStoreState {
  files: FileData[];
}

export const useFileStore = defineStore("files", {
  state: (): FileStoreState => ({
    files: [{ name: "foo1" }, { name: "foo2" }],
  }),
  actions: {
    async reFetch() {
      const { $nodeFetch } = useNuxtApp();
      const sessionStore = await useSession();

      try {
        const data = await $nodeFetch<{ files: string[] }>(
          `/files/${sessionStore.value}`,
          {
            method: "GET",
          },
        );

        this.files = data.files.map((file) => file as unknown as FileData);
      } catch (e) {}
    },
  },
});
