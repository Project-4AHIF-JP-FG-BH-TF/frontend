export interface FileData {
  name: string;
  active: boolean;
}

interface FileStoreState {
  files: FileData[];
}

export const useFileStore = defineStore("files", {
  state: (): FileStoreState => ({
    files: [
      { name: "foo1", active: false },
      { name: "foo2", active: false },
      {
        name: "Dies ist ein gefühlt unendlich langer Text, welcher ein Beispiel dafür sein soll wie lang Dateinamen sein könnten. Sollte trotzdem noch passen.",
        active: false,
      },
    ],
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

        this.files = data.files.map((file) => {
          let object = this.files.find((value) => value.name == file);

          return {
            name: file,
            active: object ? object.active : false,
          } as FileData;
        });
      } catch (e) {}
    },
  },
});
