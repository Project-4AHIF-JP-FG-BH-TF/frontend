import type { UUID } from "node:crypto";

import { defineStore } from "pinia";

interface SessionStoreState {
  sessionID: UUID | null;
}

export const useSessionStore = defineStore("session", {
  state: (): SessionStoreState => ({
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
    const data = await $fetch<{ uuid: UUID }>(
      `${runtimeConfig.public.baseURL}/api/session/`,
      {
        method: "GET",
      },
    );

    return data.uuid;
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

  await $fetch<{ uuid: UUID }>(
    `${runtimeConfig.public.baseURL}/api/session/${sessionID}`,
    {
      method: "POST",
    },
  );
}
