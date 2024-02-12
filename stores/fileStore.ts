interface FileStoreState {
  files: FileData[];
}

export interface FileData {
  name: string;
}

export const useFileStore = defineStore("files", {
  state: (): FileStoreState => ({ files: [] }),
});
