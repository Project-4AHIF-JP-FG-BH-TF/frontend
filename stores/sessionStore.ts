import {defineStore} from "pinia"
import {useAsyncData} from "nuxt/app";
import type {UUID} from "node:crypto";

interface State {
    sessionID: UUID | null
}

export const useSessionStore = defineStore("session", {
    state: (): State => ({
        sessionID: null
    }),
    getters: {
        getSessionID: (state) => state.sessionID,
    },
    actions: {
        async requestSession() {
            if (this.sessionID) {
                // TODO ERROR HANDLING
                console.log("Shouldn't occur!")
            } else {
                this.sessionID = await fetchNewSession();
            }
        },
        async refreshSession() {
            if (this.sessionID != null) {
                await fetchRefreshSession(this.sessionID);
            }
        }
    },
})

async function fetchNewSession(): Promise<UUID | null> {
    const {data, error} = await useAsyncData(async () =>
        await useFetch("/api/session/", {
            method: "GET",
        })
    );

    if (error.value != null) return null;
    return data.value!.data.value as UUID;
}

async function fetchRefreshSession(sessionID: UUID): Promise<void> {
    await useFetch(`/api/session/${sessionID}`, {
        method: "POST"
    })
}



