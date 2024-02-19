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
    refetch() {
      // todo
    },
  },
});
