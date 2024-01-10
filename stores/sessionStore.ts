import type { UUID } from "node:crypto";

import { defineStore } from "pinia";

interface State {
  sessionID: UUID | null;
}

export const useSessionStore = defineStore("session", {
  state: (): State => ({
    sessionID: null,
  }),
  getters: {
    getSessionID: (state) => state.sessionID,
  },
  actions: {
    async requestSession() {
      if (this.sessionID) {
        // TODO ERROR HANDLING
        // eslint-disable-next-line no-console
        console.log("Shouldn't occur!");
      } else {
        this.sessionID = await fetchNewSession();
      }
    },
    async refreshSession() {
      if (this.sessionID != null) {
        await fetchRefreshSession(this.sessionID);
      }
    },
  },
});

async function fetchNewSession(): Promise<UUID | null> {
  const runtimeConfig = useRuntimeConfig();

  try {
    const data = await useFetch(
      `${runtimeConfig.public.baseURL}/api/session/`,
      {
        method: "GET",
      },
    );

    return data.error.value == null
      ? (data.data.value as { uuid: UUID }).uuid
      : null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Nuxt Error");
    // eslint-disable-next-line no-console
    console.log(error);
    return null;
  }
}

async function fetchRefreshSession(sessionID: UUID): Promise<void> {
  const runtimeConfig = useRuntimeConfig();

  await useFetch(`${runtimeConfig.public.baseURL}/api/session/${sessionID}`, {
    method: "POST",
  });
}
